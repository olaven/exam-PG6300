const http = require("../shared/http");
/**
 * Express middleware. 
 * Returns 401 if not authenticated
 */
const isAuthenticated = (req, res, next) => {

	if (!req.user) {

		const status = http.codes.UNAUTHORIZED;
		res.status(status).send();
	} else {
		next();
	}
};

module.exports = {

	isAuthenticated
};