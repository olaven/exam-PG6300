/**
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/4537742786621fe1b417cb27399ea1710670fcba/les10/connect4-v2/src/server/ws/ws-handler.js
 */
const { broadcast } = require("./ws-util");
const { retrieveForUser } = require("../database/posts"); 
const tokens = require("../database/tokens"); 
const users = require("../database/users");

const SocketsToEmails = new Map(); 

const posts = (ews) => {

    return (ws, req) => {

        console.log('established a post connection');

        // // ws.messageHanders = new Map(); 
        // //ws.addMessageHandler("login", handleLogin);

        // const user = req.session.passport.user; 
        // const posts = retrieveForUser(user); 
        // sendInitialPostsToUser(posts, user, ews); 
        

        ws.on("message", fromClient => {

            const dto = JSON.parse(fromClient); 
            
            if (dto.topic === "login") {
                
                const loggedIn = websocketLogin(dto, ws); 
                if (loggedIn) {
                    sendInitialPosts(ws); 
                }
            } 
            //TODO: broadcast new post to relevant users
        });

        ws.on("error", () => {
            console.log("error in usercount-websocket..");
        });
    };
};

const sendInitialPosts = socket => {
    
    const email = SocketsToEmails.get(socket); 
    console.log(email); 
    const user = users.getUser(email); 
    const postsForUser = retrieveForUser(user); 
    const payload = JSON.stringify(postsForUser); 
    
    socket.send(payload);
}

const broadcastNewPost = ews => {

    //TODO: only relevant clients 
    const clients = ews.getWss().clients;
    broadcast(clients, {
        userCount: clients.size
    });
};


const websocketLogin = (dto, socket) => {

    const token = dto.token;

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
        if token was valid, then we can create an authenticated
        association with the given user for that token and the
        current socket
     */
    SocketsToEmails.set(socket, email)
    console.log("User '" + email + "' is now connected with a websocket.");
    return socket
}

module.exports = {
    posts
};