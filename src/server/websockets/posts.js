
const { broadcast } = require("./ws-util");
const { retrieveForUser } = require("../database/posts"); 

const posts = (ews) => {

    return (ws, req) => {

        console.log('Established a new WS connection');

        socket.messageHandlers = new Map();
        
        socket.addMessageHandler("login", handleLogin);
        const user = req.session.passport.user; 
        const posts = retrieveForUser(user); 
        sendInitialPostsToUser(posts, user, ews); 
        

        ws.on("message", fromClient => {

            //TODO: broadcast new post to relevant users
        });

        ws.on("error", () => {
            console.log("error in usercount-websocket..");
        });
    };
};

const sendInitialPostsToUser = (posts, user, ews) => {

    ews//? 
}

const broadcastNewPost = ews => {

    //TODO: only relevant clients 
    const clients = ews.getWss().clients;
    broadcast(clients, {
        userCount: clients.size
    });
};


const handleLogin = (dto, socket) => {

    const token = dto.wstoken;

    if (token === null || token === undefined) {
        socket.send(JSON.stringify({
            topic: "update",
            error: "Missing token"
        }));
        return;
    }

    //token can be used only once to authenticate only a single socket
    const userId = Tokens.consumeToken(token);

    if (userId === null || userId === undefined) {
        socket.send(JSON.stringify({
            topic: "update",
            error: "Invalid token"
        }));
        return;
    }

    /*
        if token was valid, then we can create an authenticated
        association with the given user for that token and the
        current socket
     */
    ActivePlayers.registerSocket(socket, userId);

    console.log("User '" + userId + "' is now connected with a websocket.");
}

module.exports = {
    posts
};