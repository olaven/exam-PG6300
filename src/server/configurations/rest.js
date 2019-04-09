const { codes } = require("../../shared/http");
const dataApi = require("../routes/data-api");
const authApi = require("../routes/auth-api");

const configureREST = (app) => {

	app.use("/api", dataApi);
	app.use("/api", authApi);
	// api-routes that are not matched by above routers
	app.all("/api*", (req, res) => {
		res.status(codes.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};