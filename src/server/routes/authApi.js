/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/routes/auth-api.js
 */

const express = require("express");
const passport = require("passport");

const { codes } = require("../../shared/http");
const Users = require("../database/users"); 

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {

	res.status(codes.NO_CONTENT).send();
});

router.post("/signup", function (req, res) {
    
	const created = Users.createUser(req.body.username, req.body.password);

	if (!created) {
        
		res.status(codes.BAD_REQUEST).send();
		return;
	}

	passport.authenticate("local")(req, res, () => {
		req.session.save((err) => {
			if (err) {
				//shouldn't really happen
				res.status(codes.INTERNAL_SERVER_ERROR).send();
			} else {
				res.status(codes.CREATED).send();
			}
		});
	});
});

router.post("/logout", function (req, res) {

	req.logout();
	res.status(codes.NO_CONTENT).send();
});


/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
router.get("/user", function (req, res) {

	if (!req.user) {
		res.status(codes.UNAUTHORIZED).send();
		return;
	}

	res.status(codes.OK).json({
		username: req.user.username
		//TODO  add other user data 
	});
});


module.exports = router;
