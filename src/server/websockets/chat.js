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
					
					console.log(dto + " did not match session " + dto.email) 
					ws.close();
					return;  
				} 

				if (!EmailToSockets.get(email)) {
					EmailToSockets.set(email, []); 
				}
				EmailToSockets.get(email).push(ws); 
				//EmailToSockets.set(email, ws); //NOTE: needed when sending back
				sendExistingMessages(dto.participants, ws) //TODO: Implement
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

	//TODO: sjekk at retrievebyparticic faktisk returnerer noe 
	const conversation = conversations.retrieveByParticipants(participants); 
	const messages = conversation? conversation.messages: []; 
	socket.send(JSON.stringify({
		messages
	}));  
}

const broadcastNewMessage = (participants, message) => {
	//iterer gjennom map 
	
	participants.forEach(email => {
		const sockets = EmailToSockets.get(email); 
		if (sockets) { //i.e. they are online/have "logged in"
			sockets.forEach(socket => {
				socket.send(JSON.stringify({
					singleMessage: message
				}));
			}) 
		}
	}); 
}

const closeAllSockets = initialRequest => {

	const email = initialRequest.session.passport.user.email;
	EmailToSockets.set(email, null); 
}

module.exports = {
	chat
}
