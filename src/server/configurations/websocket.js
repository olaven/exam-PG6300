
const configureWebSocket = (app) => {

	const ews = require("express-ws")(app); 
	const { chat } = require("../websockets/chat");
	const { usercount } = require("../websockets/usercount");
	const { posts } = require("../websockets/posts");
	
	app.ws("/chat", chat(ews));
	app.ws("/usercount", usercount(ews));
	app.ws("/posts", posts(ews));
};

module.exports = {
	configureWebSocket
};

