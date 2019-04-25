const express = require("express");
const http = require("../../shared/http");
const { isAuthenticated } = require("../middleware");
const users = require("../database/users");

const router = express.Router();


/**
 * Returns all users the logged in user has access to
 * (i.e. his/her friends)
 */
router.get("/users", isAuthenticated, (req, res) => {
    
	const loggedInUser = users.getUser(req.user.email);
	const friends = loggedInUser.friendEmails
		.map(email => users.getUser(email))
		.map(user => hidePasswordFrom(user));
    
	res.status(http.codes.OK).send(friends); 
});

/**
 * Return data about user if user has access
 */
router.get("/users/:email", isAuthenticated, (req, res) => {

	if (!req.params.email) {
		res.status(http.codes.BAD_REQUEST).send();
		return;
	}

	if (!users.getUser(req.params.email)) {
		res.status(http.codes.NOT_FOUND).send();
		return;
	}

	const loggedInUser = users.getUser(req.user.email);
	const areFriends = loggedInUser.friendEmails.includes(req.params.email);
	if (!areFriends) {
		res.status(http.codes.FORBIDDEN).send();
		return;
	}

	const friend = users.getUser(req.params.email); 
	const payload = hidePasswordFrom(friend);
	res.status(http.codes.OK).send(payload);
});


const hidePasswordFrom = user => {

	return {
		email: user.email,
		givenName: user.givenName,
		familyName: user.familyName,
		location: user.location,
		dateOfBirth: user.dateOfBirth
	};
};

module.exports = router; 