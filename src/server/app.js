/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/app.js
 */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const configure = require("./configurations/configure")(app);

//to handle JSON payloads
app.use(bodyParser.json());

//needed to server static files, like HTML, CSS and JS.
app.use(express.static("public"));

configure.authentication();
configure.websocket();
configure.graphql();
configure.rest();


//If 404 -> just return index
app.use((req, res, next) => {
	res.sendFile(path.resolve(__dirname, "..", "..", "public", "index.html"));
});

module.exports = {
	app
};
