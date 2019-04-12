const WebSocket = require("ws");

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
