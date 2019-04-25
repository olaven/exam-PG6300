/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/6c79d08d8d19786198730141c3d918a215df7db0/les09/chat/websocket-full/src/server/app.js
 */

const conversations = require("../database/conversations"); 
const { broadcast } = require("./ws-util"); 

const EmailToSocket = new Map(); 

const chat = (ews) => {

	return (ws, req) => {

		const email = req.session.passport.user.email; 
		console.log(email + " connected to chat"); 
		EmailToSocket.put(email, ws); 
		sendExistingMessages() //TODO: Implement

		ws.on("message", fromClient => {

			const dto = JSON.parse(fromClient);

			conversations.addMessage(dto.author, dto.participants, dto.text)
			sendNewMessage(dto.author, dto.text, ws);
		});

		ws.on("error", () => {
			console.log("error in chat-websocket..");
		});
	};
};

const sendExistingMessages = () => {

}

const sendNewMessage = (author, text, socket) => {
	console.log("I want to send new message:")
}

module.exports = {
	chat
}

// const messages = require("../database/messages");
// const { broadcast } = require("./ws-util");

// let idCounter = 0;


// const chat = (ews) => {
 
// 	return (ws, req) => {

// 		// update existing 
// 		broadcastMessages(ews, messages.getAll());
		
// 		ws.on("message", fromClient => {

// 			const dto = JSON.parse(fromClient);
// 			const id = idCounter++;
// 			const message = {
// 				id: id,
// 				username: dto.message.username,
// 				text: dto.message.text
// 			};


// 			//add to our current local store
// 			messages.addMessage(message);
// 			//do a broadcast to all existing clients
// 			broadcastMessages(ews, [message]);
// 		});

// 		ws.on("error", () => {
// 			console.log("error in chat-websocket..");
// 		});
// 	};
// };

// const broadcastMessages = (ews, messages) => {
	
// 	const clients = ews.getWss().clients;
// 	broadcast(clients, { messages });
// };

// module.exports = {
// 	chat
// };