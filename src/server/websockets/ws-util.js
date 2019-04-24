/**
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/4537742786621fe1b417cb27399ea1710670fcba/les10/connect4-v2/src/server/ws/ws-handler.js
 */
const WebSocket = require("ws");
const tokens = require("../database/tokens");


const broadcast = (clients, data) => {

	clients.forEach((client) => {

		if (client.readyState === WebSocket.OPEN) {

			client.send(JSON.stringify(data));
		}
	});
};

const websocketLogin = (dto, socket, SocketsToEmails) => {

	const token = dto.token;

	if (token === null || token === undefined) {
		socket.send(JSON.stringify({
			error: "Missing token"
		}));
		return null;
	}

	//token can be used only once to authenticate only a single socket
	const email = tokens.consumeToken(token);

	if (email === null || email === undefined) {
		socket.send(JSON.stringify({
			error: "Invalid token"
		}));
		return null;
	}

	/*
	if token was valid, then we can create an authenticated
	association with the given user for that token and the
	current socket
	 */
	SocketsToEmails.set(socket, email);
	console.log("User '" + email + "' is now connected with a websocket.");
	return socket;
};


module.exports = {
	broadcast, 
	websocketLogin
};
