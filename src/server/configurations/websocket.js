/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/6c79d08d8d19786198730141c3d918a215df7db0/les09/chat/websocket-full/src/server/app.js
 */
const WebSocket = require("ws");

const messages = require("../database/messages");

let idCounter = 0;
const configureWebSocket = (app) => {

	const ews = require("express-ws")(app);

	app.ws("/", function (ws, req) {

		/*
            new connection, send all existing messages.
            TODO: this would not handle the case of a client that already
            had the data from previous connection, and started a new one (will get duplicates)
        */
		const allMessages = messages.getAll(); 
		ws.send(JSON.stringify(
			{
				messages: allMessages,
				userCount: ews.getWss().clients.size
			}
		))

		ws.on("close", () => {
			//do a broadcast to all existing clients
			ews.getWss().clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {

					client.send(JSON.stringify({
						messages: messages.getAll(),
						userCount: ews.getWss().clients.size
					}));
				}
			});
		});

		/*
            Here, we register a callback, which is going to be executed every time a client
            does a send() to the server
        */
		ws.on("message", fromClient => {

			const dto = JSON.parse(fromClient);
			const id = idCounter++;
			const message = {
				id: id,
				username: dto.message.username,
				text: dto.message.text
			};

			//add to our current local store
			messages.addMessage(message);

			//do a broadcast to all existing clients
			ews.getWss().clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
                
					client.send(JSON.stringify({
						messages: [message], 
						userCount: ews.getWss().clients.size
					}));
				}
			});
		});
	});
};

module.exports = {
	configureWebSocket
};

