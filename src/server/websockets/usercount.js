/**
 * 
 * NOTE: This file is partially copied from: 
 * * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-09/src/server/ws-handler.js
 */
const { broadcast } = require("./ws-util");
let ews; 
const usercount = (e) => {

	ews = e;
	return (ws, req) => {
		
		broadcastUserCount();

		ws.on("close", () => {
			
			broadcastUserCount();
		});
	};
};

const broadcastUserCount = () => {

	// broadcast to all connected clients
	const clients = ews.getWss().clients;
    
	broadcast(clients, { userCount: clients.size });
};


module.exports = {
	usercount
};