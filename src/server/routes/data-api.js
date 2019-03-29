const express = require('express');
const database = require("../database/database"); 
const router = express.Router();

router.get("/data", async (req, res) => {
    
    const data = await database.getAll(); 
    res.send(data); 
})

router.get("/data/:id", async (req, res) => {

    const data = await database.getAll();
    const filtered = data.filter(element => 
        element.id === req.param.id
    );

    if (filtered.lenght <= 0) {
        res.status(404).send();
        return;
    }

    const payload = JSON.stringify(filtered[0]);
    res.status(200).send(payload);
}); 

module.exports = router; 
