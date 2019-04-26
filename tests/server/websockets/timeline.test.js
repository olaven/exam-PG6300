/**
 * NOTE: This file is partially copied from: 
 * * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/server/ws-handler-test.js
 */

const { app } = require("../../../src/server/app");
const WS = require("ws");
const { getDevUser } = require("../../../src/server/database/demo"); 
const request = require("supertest");


const {
    asyncCheckCondition,
    checkConnectedWS,
    overrideWebSocket
} = require("../../mytest-utils");

const getLoggedInAgentAs = async (user) => {

    const agent = await request.agent(app);
    let loginResponse = await agent
        .post("/api/login")
        .send({
            email: user.email,
            password: user.password
        })
        .set("Content-Type", "application/json");
    return agent;
}



let server;
let port;
const sockets = [];

const connectSocket = async (onMessage, updatedPredicate) => {

    const socket = new WS("ws://localhost:" + port + "/timeline");

    sockets.push(socket);
    socket.on("message", onMessage);

    const connected = await checkConnectedWS(socket, 2000);
    expect(connected).toBe(true);

    const updated = await asyncCheckCondition(() =>
        updatedPredicate, 2000, 200);
    
    expect(updated).toEqual(true);

    return socket;
};

describe("Websocket for timeline.", () => {


    beforeAll(done => {

        server = app.listen(0, () => {

            port = server.address().port;
            done(); 
        });
    });

    afterAll(() => {
        for (let i = 0; i < sockets.length; i++) {

            sockets[i].close();
        }
        sockets.length = 0;
        server.close();
    });


    it("can connect", async () => {

        const socket = await connectSocket(
            () => {},
            () => true // not testing for a message here.
        ); 

        expect(socket).toBeDefined(); 
    });

    it("can login and get posts", async () => {

        const agent = await getLoggedInAgentAs(getDevUser()); 
        const tokenResponse = await agent
            .post("/api/tokens")
            .send();
        
        const token = tokenResponse.body.token; 
        const socket = new WS("ws://localhost:" + port + "/timeline");

        sockets.push(socket); 
        socket.on("open", () => {
            socket.send(JSON.stringify({
                token, 
                topic: "login",
                merged: true // as devuser has no posts
            })); 
        }); 

        let posts; 
        socket.on("message", data => {
            
            
            const dto = JSON.parse(data); 
            posts = dto.posts; 
        }); 

        await asyncCheckCondition(() => posts, 2000, 100); 
        
        expect(posts).toBeDefined(); 
        posts.forEach(post => {
            expect(post.title).toBeDefined(); 
            expect(post.content).toBeDefined()
            expect(post.authorEmail).toBeDefined()
        }); 
    })

});
