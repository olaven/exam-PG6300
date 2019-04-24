
const configureWebSocket = (app) => {

	const ews = require("express-ws")(app); 
	const { chat } = require("../websockets/chat");
	const { usercount } = require("../websockets/usercount");
	const { mergedTimeline } = require("../websockets/mergedTimeline");
	const { soloTimeline } = require("../websockets/soloTimeline");
	
	app.ws("/chat", chat(ews));
	app.ws("/usercount", usercount(ews));
	app.ws("/mergedTimeline", mergedTimeline(ews));
	app.ws("/soloTimeline", soloTimeline(ews));
};

module.exports = {
	configureWebSocket
};

