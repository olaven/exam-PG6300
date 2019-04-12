
const configureWebSocket = (app) => {

	const ews = require("express-ws")(app); 
	const { chat } = require("../websockets/chat");
	
	app.ws("/", chat(ews));
};

module.exports = {
	configureWebSocket
};

