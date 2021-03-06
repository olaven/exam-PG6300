const { codes } = require("../../shared/http");
const authApi = require("../routes/authApi");
const tokenApi = require("../routes/tokensApi");
const searchApi = require("../routes/searchApi");
const friendRequestsApi = require("../routes/friendRequestsApi"); 
const usersApi = require("../routes/usersApi"); 

const configureREST = (app) => {


	app.use("/api", authApi);
	app.use("/api", tokenApi);
	app.use("/api", searchApi);
	app.use("/api", usersApi);
	app.use("/api", friendRequestsApi);
	// api-routes that are not matched by above routers
	app.use("/api*", (req, res) => {
		res.status(codes.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};