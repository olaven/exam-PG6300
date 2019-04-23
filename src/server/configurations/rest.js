const { codes } = require("../../shared/http");
const dataApi = require("../routes/dataApi");
const authApi = require("../routes/authApi");

const configureREST = (app) => {

	app.use("/api", dataApi);
	app.use("/api", authApi);
	// api-routes that are not matched by above routers
	app.use("/api*", (req, res) => {
		res.status(codes.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};