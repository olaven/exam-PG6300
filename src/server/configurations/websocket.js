
const configureWebSocket = (app) => {

	const ews = require("express-ws")(app); 
	const { chat } = require("../websockets/chat");
	const { usercount } = require("../websockets/usercount");
	const { timeline } = require("../websockets/timeline");
	
	app.ws("/chat", chat(ews));
	app.ws("/usercount", usercount(ews));
	app.ws("/timeline", timeline(ews));
};

module.exports = {
	configureWebSocket
};

