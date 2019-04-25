const express = require("express");
const { isAuthenticated } = require("../middleware");
const http = require("../../shared/http");
const users = require("../database/users");
const friendRequests = require("../database/friendRequests");
const router = express.Router();


/**
 * Gets friendrequest for the user specified in query param
 * Query: from = some@email.com
 */
router.get("/friendRequests", isAuthenticated, (req, res) => {

	/**
     * NOTE: Here, I could just return the requets for the logged in user, 
     * as /api/user does. However, I am filtering on a subset. Therefore, 
     * I fidn it more appropriate to pass the user in a query. 
     */
	const toEmail = req.query.to; 
	if (!toEmail) {
		res.status(http.codes.BAD_REQUEST).send(); 
		return; 
	}

	if (toEmail !== req.user.email) {
		res.status(http.codes.FORBIDDEN).send(); 
		return; 
	}

	// If there are no requests, I just send an empty array
	const requests = friendRequests.retrieveTo(toEmail); 
	res.status(http.codes.OK).send(requests); 
});

router.post("/friendRequests", isAuthenticated, (req, res) => {

	const fromEmail = req.body.from; 
	const fromUser = users.getUser(fromEmail);
    
	const toEmail = req.body.to; 
	const toUser = users.getUser(toEmail); 

	if (!fromUser || !toUser) {
		res.status(http.codes.BAD_REQUEST).send(); 
		return; 
	}

	const alreadyFriends = fromUser.friendEmails.includes(toEmail); 
	const alreadySentRequest = friendRequests
		.retrieveFrom(fromEmail)
		.find(request => request.to === toEmail && request.from === fromEmail);
    
	if (alreadyFriends || alreadySentRequest) {
		res.status(http.codes.CONFLICT).send(); 
		return; 
	}

	friendRequests.persist(fromEmail, toEmail); 
	res.send(http.codes.CREATED).send();
});


router.delete("/friendRequests/:id", isAuthenticated, (req, res) => {


	const requestAcceptHeader = req.get("x-request-accepted");
	if(!requestAcceptHeader || !req.params.id) {
		res.status(http.codes.BAD_REQUEST).send(); 
		return; 
	}

	const id = req.params.id; 
	const accepted = (requestAcceptHeader === "true"); 
	const friendRequest = friendRequests.retrieveById(id); 

	if (!friendRequest) {
		res.status(http.codes.NOT_FOUND).send(); 
		return; 
	}  
    
    
	if (accepted) {

		friendRequest;//? 
		users.addFriends(friendRequest.from, friendRequest.to);
	}

	friendRequests.remove(id);

	res.status(http.codes.NO_CONTENT).send(); 
}); 

module.exports = router;
