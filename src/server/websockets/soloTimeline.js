const { broadcast, websocketLogin } = require("./ws-util");
const { retrieveByUser } = require("../database/posts");
const users = require("../database/users");

const SocketsToEmails = new Map();

const soloTimeline = (ews) => {

    return (ws, req) => {

        ws.on("message", fromClient => {

            const dto = JSON.parse(fromClient);

            if (dto.topic === "login") {

                const loggedIn = websocketLogin(dto, ws, SocketsToEmails);
                if (loggedIn) {
                    sendInitialPosts(ws);
                }
            }
            //TODO: broadcast new post to relevant users
        });

        ws.on("error", () => {
            console.log("error in posts-websocket..");
        });
    };
};

const sendInitialPosts = socket => {

    const email = SocketsToEmails.get(socket);
    const user = users.getUser(email);
    const postsByuser = retrieveByUser(user);
    const payload = JSON.stringify({
        posts: postsByuser
    });

    socket.send(payload);
}

const broadcastNewPost = ews => {

    //TODO: only relevant clients 
    const clients = ews.getWss().clients;
    broadcast(clients, {
        userCount: clients.size
    });
};


module.exports = {
    soloTimeline
};