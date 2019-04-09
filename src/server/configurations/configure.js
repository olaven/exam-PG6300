const { configureAuthentication } = require("./authentication");
const { configureWebSocket } = require("./websocket");
const { configureGraphQL } = require("./graphql");
const { configureREST } = require("./rest");
/**
 * This class exposes configurations that 
 * may be applied to the express app.
 */
module.exports = (app) => {

	return {
		authentication: () => {
			configureAuthentication(app);
		},
		websocket: () => {
			configureWebSocket(app);
		},
		graphql: () => {
			configureGraphQL(app);
		},
		rest: () => {
			configureREST(app);
		}
	};
};
