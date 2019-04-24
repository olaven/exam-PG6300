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


module.exports = {
	broadcast
};
