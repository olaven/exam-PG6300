const { broadcast } = require("./ws-util");

const usercount = (ews) => {

	return (ws, req) => {
		
		broadcastUserCount(ews);

		ws.on("close", () => {
			
			broadcastUserCount(ews);
		});

		ws.on("error", () => {
			console.log("error in usercount-websocket.."); 
		}); 
	};
};

const broadcastUserCount = (ews) => {

	// broadcast to all connected clients
	const clients = ews.getWss().clients;
	broadcast(clients, { userCount: clients.size });
};


module.exports = {
	usercount
};