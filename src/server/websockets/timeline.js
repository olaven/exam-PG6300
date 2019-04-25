const { broadcast } = require("./ws-util");
const { retrieveByAuthorEmails, persist } = require("../database/posts");
const users = require("../database/users");
const tokens = require("../database/tokens"); 

// holds emails that socket should get update sfrom 
const SocketToSubscriptions = new Map(); 
const EmailToSocket = new Map(); 

const timeline = (ews) => {

	return (ws, req) => {

		ws.on("message", fromClient => {

			console.log("received some message", fromClient); 
			const dto = JSON.parse(fromClient);

			if (dto.topic === "login") {

				const loggedIn = websocketLogin(dto, ws);
				if (loggedIn) {
					sendInitialPosts(ws);
				}
			} 
			if (dto.post) {
				
				const persisted = persist(dto.post);
				broadcastNewPost(persisted, ws)
			}
			//TODO: broadcast new post to relevant users
		});

		ws.on("error", () => {
			console.log("error in posts-websocket..");
		});

		ws.on("close", () => {
			
			// remove the socket from the ones I listen to 
		})
	};
};

const sendInitialPosts = socket => {

	const subscriptions = SocketToSubscriptions.get(socket); 
	const postsFromSubscriptions = retrieveByAuthorEmails(subscriptions); 
	const dto = {
		posts: postsFromSubscriptions
	}

	const payload = JSON.stringify(dto);  
	socket.send(payload); 
};


const broadcastNewPost = (post, socket) => {

	const payload = JSON.stringify({
		singlePost: post
	}); 
	SocketToSubscriptions.get(socket).forEach(email => {

		console.log(email, " is among subscriptions")
		console.log("all emails registered:", EmailToSocket.entries()); 
		const s = EmailToSocket.get(email); 
		if (s) { // user is active
			s.send(payload); 
		}
	}); 
	//TODO: finn subscriptions og hent  tilbake. Kanskje jeg kan iterere gjennom values ("baklengs") på map? 
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

	EmailToSocket.set(email, socket); 

	console.log("User '" + email + "' is now connected with timeline-websocket.");
	return socket;
};



module.exports = {
	timeline
};