/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/6c79d08d8d19786198730141c3d918a215df7db0/les09/chat/websocket-full/src/server/app.js
 */

const WebSocket = require("ws");
const messages = require("../database/messages");

let idCounter = 0;


//TODO: REFACTOR ALL THE DUPLICATION
const chat = (ews) => {
 
	return (ws, req) => {

		// update existing 
		broadcast(ews, messages.getAll());

		ws.on("close", () => {
			//do a broadcast to all existing clients
			broadcast(ews, messages.getAll());
		});

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
			broadcast(ews, [message]);
		});
	};
};

const broadcast = (ews, messages) => {

	const userCount = ews.getWss().clients.size;

	ews.getWss().clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {

			client.send(JSON.stringify({
				messages, userCount
			}));
		}
	});
};

module.exports = {
	chat
};