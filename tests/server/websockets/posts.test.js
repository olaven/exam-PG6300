/**
 * NOTE: This file is partially copied from: 
 * * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/server/ws-handler-test.js
 */

const {
    app
} = require("../../../src/server/app");
const WS = require("ws");

const {
    asyncCheckCondition,
    checkConnectedWS,
    overrideWebSocket
} = require("../../mytest-utils");



let server;
let port;
const sockets = [];

const connectSocket = async (onMessage, updatedPredicate) => {

    const socket = new WS("ws://localhost:" + port + "/posts");

    sockets.push(socket);
    socket.on("message", onMessage);

    const connected = await checkConnectedWS(socket, 2000);
    expect(connected).toBe(true);

    const updated = await asyncCheckCondition(() =>
        updatedPredicate, 2000, 200);
    expect(updated).toEqual(true);

    updated//? 

    return socket;
};

describe.only("Websocket for usercount.", () => {


    beforeEach(done => {

        server = app.listen(0, () => {

            port = server.address().port;
            overrideWebSocket(port);
            done();
        });
    });

    afterEach(async () => {

        await server.close();
        for (let i = 0; i < sockets.length; i++) {

            await sockets[i].close();
        }
        sockets.length = 0;
    });

    it("can connect", async () => {

        const socket = await connectSocket(
            () => {},
            () => true // not testing for a message here.
        ); 

        expect(socket).toBeDefined(); 
    });

    it("sends posts after connection", async () => {

        let received = null; 
        let updated = false;
        await connectSocket(
            data => {
                updated = true;
                received = JSON.parse(data);
            },
            () => updated
        );

        received//? 
        expect(received).not.toBe(null); 
    })

});
