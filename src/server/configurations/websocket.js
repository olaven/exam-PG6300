
const configureWebSocket = (app) => {

	const ews = require("express-ws")(app); 
	const { chat } = require("../websockets/chat");
	const { usercount } = require("../websockets//usercount");
	
	app.ws("/", chat(ews));//TODO: REmove once frontend is updated
	app.ws("/chat", chat(ews));
	app.ws("/usercount", usercount(ews));
};

module.exports = {
	configureWebSocket
};

