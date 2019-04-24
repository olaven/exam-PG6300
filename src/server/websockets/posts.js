/**
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/4537742786621fe1b417cb27399ea1710670fcba/les10/connect4-v2/src/server/ws/ws-handler.js
 */
const { broadcast } = require("./ws-util");
const { retrieveForUser } = require("../database/posts"); 
const { consumeToken } = require("../database/tokens"); 

const posts = (ews) => {

    return (ws, req) => {

        console.log('established a post connection');

        // ws.messageHanders = new Map(); 
        //ws.addMessageHandler("login", handleLogin);

        const user = req.session.passport.user; 
        const posts = retrieveForUser(user); 
        sendInitialPostsToUser(posts, user, ews); 
        

        ws.on("message", fromClient => {

            const dto = JSON.parse(fromClient); 
            
            if (dto.topic === "login") {
                handleLogin(dto, ws); 
            } 
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

    const token = dto.token;
    
    console.log("------------------------------------")
    console.log("received atoken from client: ", token);
    console.log("------------------------------------")

    if (token === null || token === undefined) {
        socket.send(JSON.stringify({
            error: "Missing token"
        }));
        return;
    }

    //token can be used only once to authenticate only a single socket
    const userId = tokens.consumeToken(token);
    //NESTE: vit at userId er riktig, finn ut hvordan du skal erstatte ActivPlayers
    if (userId === null || userId === undefined) {
        socket.send(JSON.stringify({
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