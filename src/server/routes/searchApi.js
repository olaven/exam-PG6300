const express = require("express");
const { isAuthenticated } = require("../middleware");
const http = require("../../shared/http");
const { getAllUsers } = require("../database/users");
const router = express.Router();

/**
 * This is queried to get a token. This token can then be used 
 * connecting to the /timeline WS-endpoints. 
 */
router.get("/search/:searchQuery", isAuthenticated, (req, res) => {

    //NOTE: req.user is defined, as user has to be authenticated at this point
    const searchQuery = req.params.searchQuery; 
    searchQuery//? 
    if (searchQuery == "undefined" || searchQuery == "null") {
        res.status(http.codes.BAD_REQUEST).send(); 
        return; 
    }

    const results = getAllUsers().filter(user => {
        const searchName = (user.givenName + " " + user.familyName).toLowerCase(); 
        return searchName.includes(searchQuery.toLowerCase()); 
    }).map(user => {
        //NOTE: I do not want to send more information, as search is for every user, not just friends
        return {
            email: user.email,
            givenName: user.givenName,
            familyName: user.familyName
        }
    }); 

    res.status(http.codes.OK).send({
        results
    });
});


module.exports = router;
