const express = require("express");
const { isAuthenticated } = require("../middleware");
const http = require("../../shared/http"); 
const tokens = require("../database/tokens");
const router = express.Router();

/**
 * This is queried to get a token. This token can then be used 
 * connecting to the /posts WS-endpoint. 
 */
router.get("/token", isAuthenticated, (req, res) => {

    //NOTE: req.user is defined, as user has to be authenticated at this point
    const email = req.user.email; 
    const token = tokens.createTokenFor(email); 

    res.status(http.codes.OK).send({ token }); 
});


module.exports = router;
