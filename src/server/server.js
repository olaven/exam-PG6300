/**
 * 
 * NOTE: This file is copied from: 
 * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/server.js
 */

const { app } = require("./app");

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log("Started server on port " + port);
});
