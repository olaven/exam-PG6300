const { codes } = require("../../shared/http");
const authApi = require("../routes/authApi");
const tokenApi = require("../routes/tokenApi");
const searchApi = require("../routes/searchApi");

const configureREST = (app) => {


	app.use("/api", authApi);
	app.use("/api", tokenApi);
	app.use("/api", searchApi);
	// api-routes that are not matched by above routers
	app.use("/api*", (req, res) => {
		res.status(codes.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};