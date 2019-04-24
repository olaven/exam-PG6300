const { broadcast } = require("./ws-util");
const { retrieveByAuthorEmails } = require("../database/posts");
const users = require("../database/users");
const tokens = require("../database/tokens"); 

// holds emails that socket should get update sfrom 
const SocketToSubscriptions = new Map(); 

const timeline = (ews) => {

	return (ws, req) => {

		ws.on("message", fromClient => {

			const dto = JSON.parse(fromClient);

			if (dto.topic === "login") {

				const loggedIn = websocketLogin(dto, ws);
				if (loggedIn) {
					sendInitialPosts(ws);
				}
			} else {
				
			}
			//TODO: broadcast new post to relevant users
		});

		ws.on("error", () => {
			console.log("error in posts-websocket..");
		});
	};
};

const sendInitialPosts = socket => {

	const subscriptions = SocketToSubscriptions.get(socket); 
	console.log("SUBS AFTER MAP: ", subscriptions); 
	const postsFromSubscriptions = retrieveByAuthorEmails(subscriptions); 
	
	const dto = {
		posts: postsFromSubscriptions
	}

	console.log("DTO: ", dto); 
	const payload = JSON.stringify(dto);  
	socket.send(payload); 
};

const websocketLogin = (dto, socket) => {

	const token = dto.token;
	const merged = dto.merged; 

	if (merged == null || merged === undefined) {
		socket.send(JSON.stringify({
			error: "Missing valid merged-option"
		}));
		return null;
	}

	if (token === null || token === undefined) {
		socket.send(JSON.stringify({
			error: "Missing token"
		}));
		return null;
	}

	//token can be used only once to authenticate only a single socket
	const email = tokens.consumeToken(token);

	if (email === null || email === undefined) {
		socket.send(JSON.stringify({
			error: "Invalid token"
		}));
		return null;
	}

	/*
	if token was valid, we continue to set up associations for the socket
	 */
	const user = users.getUser(email);
	let subscriptions = [user.email]; 

	if (merged) {
		subscriptions = subscriptions.concat(user.friendEmails); 
	} 

	SocketToSubscriptions.set(socket, subscriptions); 
	console.log("User '" + email + "' is now connected with timeline-websocket.");
	return socket;
};


const broadcastNewPost = ews => {

	//TODO: only relevant clients 
	const clients = ews.getWss().clients;
	broadcast(clients, {
		userCount: clients.size
	});
};


module.exports = {
	timeline
};