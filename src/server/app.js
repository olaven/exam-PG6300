/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/app.js
 */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const dataApi = require("./routes/data-api");
const authApi = require("./routes/auth-api"); 

const app = express();
const configure = require("./configurations/configure")(app);

//to handle JSON payloads
console.log("I am adding bodyparser");
app.use(bodyParser.json());

//needed to server static files, like HTML, CSS and JS.
app.use(express.static("public"));

configure.authentication();
configure.websocket();
configure.graphQL();

//--- Routes -----------
// Routes: 
app.use("/api", dataApi);
app.use("/api", authApi);

// api-routes that are not matched by above routers
app.all("/api*", (req, res) => {
	res.status(404).send(); 
}); 

//If 404 -> just return index
app.use((req, res, next) => {
	res.sendFile(path.resolve(__dirname, "..", "..", "public", "index.html"));
});

module.exports = {
	app
};
