/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/6c79d08d8d19786198730141c3d918a215df7db0/les09/chat/websocket-full/src/server/app.js
 */

const conversations = require("../database/conversations"); 

const EmailToSockets = new Map(); 

const chat = (ews) => {

	return (ws, req) => {

		ws.on("message", fromClient => {

			
			const dto = JSON.parse(fromClient);
			
			if(dto.topic === "message") {
				
				const message = conversations.addMessage(dto.author, dto.text, dto.participants)
				broadcastNewMessage(dto.participants, message);
			} else if (dto.topic === "opened") {

				const email = req.session.passport.user.email;
				console.log(email + " did connect"); 
				if (email !== dto.email) {
					
					ws.close();
					return;  
				} 

				if (!EmailToSockets.get(email)) {
					EmailToSockets.set(email, []); 
				}
				
				//reason: when participants are a and b, _this_ socket will be used
				EmailToSockets.get(email).push({
					participants: dto.participants, 
					socket: ws 
				}); 
				//EmailToSockets.set(email, ws); //NOTE: needed when sending back
				sendExistingMessages(dto.participants, ws)
			}
		});

		ws.on("close", () => {

			closeAllSockets(req); 
		}); 

		ws.on("error", () => {
			
			closeAllSockets(req); 
		});
	};
};

const sendExistingMessages = (participants, socket) => {

	const conversation = conversations.retrieveByParticipants(participants); 
	const messages = conversation? conversation.messages: []; 
	
	socket.send(JSON.stringify({
		messages
	}));  
}

const broadcastNewMessage = (participants, message) => {
	
	/**
	 * Structure of map: 
	 * {
	 * 	participants [mail, mail]
	 * 	socket
	 * }
	 */
	const payload = JSON.stringify({
		singleMessage: message 
	}); 

	participants.forEach(email => {

		//possiblities for correct conversation.
		const possibilities = EmailToSockets.get(email); 
		if (possibilities) {
			possibilities.forEach(possibility => {
				if (possibility.participants.every(p => participants.includes(p))) {
					const socket = possibility.socket;
					socket.send(payload);
				}
			})
		}
	})
}

const closeAllSockets = initialRequest => {

	const email = initialRequest.session.passport.user.email;
	EmailToSockets.set(email, null); 
}

module.exports = {
	chat
}
