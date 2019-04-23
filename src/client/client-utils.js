const getWebSocket = endpoint => {
    
	const protocol = (window.location.protocol.toLowerCase() === "https:" ? "wss:" : "ws:");
	const socket = new WebSocket(protocol + "//" + window.location.host + endpoint);
	return socket; 
};

module.exports = {
	getWebSocket
};