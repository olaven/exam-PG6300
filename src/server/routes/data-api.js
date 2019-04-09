const express = require("express");
const { getAll, getById, getByChecked } = require("../database/data"); 
const router = express.Router();

router.get("/data", (req, res) => {

	if(!req.user) {
		res.status(403).send(); 
	}

	const checked = req.query.checked;
	if (checked === "true" || checked === "false") {

		const data = getByChecked(checked);
		res.status(200).send(data);
	} else if (checked !== undefined) {
		//".checked" is specified, but it is not a boolean
		res.status(400).send();
		return;
	}

	const allData = getAll();
	res.status(200).send(allData);
});

router.get("/data/:id", async (req, res) => {

	if (!req.user) {
		res.status(403).send();
	}

	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		res.status(400).send();
		return;
	}

	const data = getById(id);
	if (!data) {
		res.status(404).send();
		return;
	}

	res.status(200).send(data);
}); 

module.exports = router; 
