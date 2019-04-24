const express = require("express");

const { isAuthenticated } = require("../middleware");
const { codes } = require("../../shared/http");
// const { getAll, getById, getByChecked } = require("../database/data"); 
const router = express.Router();

router.get("/data", isAuthenticated, (req, res) => {

	const checked = req.query.checked;
	if (checked === "true" || checked === "false") {

		const data = getByChecked(checked);
		res.status(codes.OK).send(data);
	} else if (checked !== undefined) {
		//".checked" is specified, but it is not a boolean
		res.status(codes.BAD_REQUEST).send();
		return;
	}

	const allData = getAll();
	res.status(codes.OK).send(allData);
});

router.get("/data/:id", isAuthenticated, async (req, res) => {

	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		res.status(codes.BAD_REQUEST).send();
		return;
	}

	const data = getById(id);
	if (!data) {
		res.status(codes.NOT_FOUND).send();
		return;
	}

	res.status(codes.OK).send(data);
}); 

module.exports = router; 
