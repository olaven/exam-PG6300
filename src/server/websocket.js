/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/6c79d08d8d19786198730141c3d918a215df7db0/les09/chat/websocket-full/src/server/app.js
 */
const WebSocket = require("ws");

const messages = require("./database/messages");


let idCounter = 0;
const configureWebSocket = (app) => {

    const ews = require('express-ws')(app);

    app.ws('/', function (ws, req) {
        console.log('Established a new WS connection');

        /*
            new connection, send all existing messages.
            TODO: this would not handle the case of a client that already
            had the data from previous connection, and started a new one (will get duplicates)
        */
        const allMessages = messages.getAll(); 
        ws.send(JSON.stringify(allMessages));

        /*
            Here, we register a callback, which is going to be executed every time a client
            does a send() to the server
        */
        ws.on('message', fromClient => {

            /*
                what we get from client is a string.
                not only we need to parse it into a JSON object, but
                also want to add a unique id to it (which we would need
                if wanted to handle avoiding sending duplicated msgs)
            */

            const dto = JSON.parse(fromClient);
            const id = idCounter++;
            const msg = {
                id: id,
                username: dto.username,
                text: dto.text
            };

            //add to our current local store
            messages.addMessage(msg);

            //do a broadcast to all existing clients
            ews.getWss().clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    /*
                        even if a single msg, we will have it in a list of size 1.
                        This does simplify the code on the client, as it does not
                        need to distinguish between the download of all msgs on connection
                        and these following broadcasts, i.e., they ll have the same structure.
                    */
                    client.send(JSON.stringify([msg]));
                }
            });
        })
    });
}

module.exports = {
    configureWebSocket
}

