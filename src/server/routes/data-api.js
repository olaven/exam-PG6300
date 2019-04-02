const express = require('express');
const { getAll, getById } = require("../database/data"); 
const router = express.Router();

router.get("/data", async (req, res) => {
    
    const allData = await getAll(); 
    res.send(allData); 
})

router.get("/data/:id", async (req, res) => {

    const data = await getById(req.param.id);

    if (!data) {
        res.status(404).send();
        return;
    }

    const payload = JSON.stringify(data);
    res.status(200).send(payload);
}); 

module.exports = router; 
