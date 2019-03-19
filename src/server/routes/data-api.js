const express = require('express');
const database = require("../database/database"); 
const router = express.Router();

router.get("/data", async (req, res) => {
    
    const data = await database.getAll(); 
    res.send(data); 
})

router.get("/data/:id", async (req, res) => {

}); 

module.exports = router; 
