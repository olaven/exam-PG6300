const { codes } = require("../../shared/http");
const postsApi = require("../routes/postsApi");
const authApi = require("../routes/authApi");
const tokenApi = require("../routes/tokenApi");

const configureREST = (app) => {

	app.use("/api", postsApi);
	app.use("/api", authApi);
	app.use("/api", tokenApi);
	// api-routes that are not matched by above routers
	app.use("/api*", (req, res) => {
		res.status(codes.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};