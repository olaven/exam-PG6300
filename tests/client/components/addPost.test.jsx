const React = require("react");
const WS = require("ws");
const { mount } = require("enzyme");
const { app } = require("../../../src/server/app"); 
const { getDevUser } = require("../../../src/server/database/demo");
const { retrieveByUser } = require("../../../src/server/database/posts"); 
const { AddPost } = require("../../../src/client/components/addPost");
const { overrideFetch, overrideFetchWithAgent, getLoggedInAgentAs, overrideWebSocket, asyncCheckCondition, checkConnectedWS } = require("../../mytest-utils");

const getAddPost = props => mount(<AddPost {...props} />)

const fillForm = (wrapper, title, content, doClick) => {

    const titleInput = wrapper.find("#titleInput").at(0);
    const contentInput = wrapper.find("#contentInput").at(0);
    const button = wrapper.find("#addButton").at(0);

    titleInput.simulate("change", { target: { value: title } });
    contentInput.simulate("change", { target: { value: content } }); 

    if(doClick) {
        button.simulate("click"); 
    }
}


//NOTE: global, so it can be closed after test 
let sockets = []; 
let server; 
let port; 

const getLoggedInWebSocket = async () => {

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

    return socket; 
}

describe("The component for adding posts", () => {

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

    it("updates state on input", () => {

        const user = getDevUser(); 
        const wrapper = getAddPost({
            //neither props needed in this test
        }); 

        const title = "test title"; 
        const content = "test content"; 

        fillForm(wrapper, title, content, false); 

        const state = wrapper.state(); 
        
        expect(state.title).toEqual(title); 
        expect(state.content).toEqual(content); 
    }); 

    it("alerts if there is an errorw ith the websocket", async () => {

        let called = false
        global.alert = () => {
            called = true
        }
    

        const user = getDevUser();
        const socket = await getLoggedInWebSocket();

        const wrapper = getAddPost({
            author: user.email,
            socket: socket
        });

        // This results in error because I am not waiting 
        //for socket to fuly connect
        fillForm(wrapper, "title", "content", true); 
        expect(called).toBe(true); 

    })

    it("adds posts via websockets", async () => {

        
        const title = "Other Title";
        const content = "Some more content";

        const user = getDevUser(); 
        const originalPostCount = retrieveByUser(user).length; 

        const socket = await getLoggedInWebSocket(); 
        const connected = await checkConnectedWS(socket, 2000); 

        expect(connected).toBe(true); 
    

        const wrapper = getAddPost({
            author: user.email, 
            socket: socket
        }); 

        fillForm(wrapper, title, content, true); 

        //NOTE: since "onmessage" is overridden by timeline, I will check db
        await asyncCheckCondition(() => {
            return retrieveByUser(user).length > originalPostCount
        }, 2500, 100); 

        expect(retrieveByUser(user).length).toBeGreaterThan(originalPostCount);
    })

});