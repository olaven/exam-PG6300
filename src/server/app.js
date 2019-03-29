/**
 * 
 * NOTE: This file is partially copied from: 
 * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/app.js
 */
const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const path = require('path');

const { configureAuthentication } = require("./authentication");

const dataApi = require("./routes/data-api")
const authApi = require("./routes/auth-api"); 

const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//TODO: Add websocket support
//WsHandler.init(app);


app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

configureAuthentication(app);

//--- Routes -----------
// Routes: 
app.use("/api", dataApi)
app.use('/api', authApi);

// api-routes that are not matched by above routers
app.all('/api*', (req, res) => {
    res.status(404).send(); 
}); 


//If 404 -> just return index
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {
    app
};
