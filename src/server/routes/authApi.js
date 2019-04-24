/**
 * 
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/routes/auth-api.js
 */

const express = require("express");
const passport = require("passport");

const { codes } = require("../../shared/http");
const { isAuthenticated } = require("../middleware"); 
const Users = require("../database/users"); 

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
	
	res.status(codes.NO_CONTENT).send();
});

router.post("/signup", function (req, res) {
    
	let created = Users.createUser(
		req.body.email, 
		req.body.givenName, 
		req.body.familyName, 
		req.body.dateOfBirth,
		req.body.location, 
		req.body.password
	);

	// const created = Users.createUser(req.body.user, req.body.password);
	
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
    Return data about the user if the session cookie is valid 
 */
router.get("/user", isAuthenticated, (req, res) => {

	const user = Users.getUser(req.user.email); 

	res.status(codes.OK).json({
		email: user.email, 
		givenName: user.givenName, 
		familyName: user.familyName, 
		location: user.location, 
		dateOfBirth: user.dateOfBirth
	}); 
});

/**
 * Return data about user if user has access
 */
router.get("/user/:email", isAuthenticated, (req, res) => {

	if (!req.params.email) {
		res.status(codes.BAD_REQUEST).send(); 
		return; 
	}

	const loggedInUser = Users.getUser(req.user.loggedInUser); 
	const areFriends = loggedInUser.friendEmails.includes(req.params.email); 
	if (!areFriends) {
		res.status(codes.FORBIDDEN).send(); 
		return; 
	}

	const payload = getUserInformation(req.user); 
	res.status(codes.OK).send(payload); 
}); 

const getUserInformation = user => {
	
	return {
		email: user.email,
		givenName: user.givenName,
		familyName: user.familyName,
		location: user.location,
		dateOfBirth: user.dateOfBirth
	}
}


module.exports = router;
