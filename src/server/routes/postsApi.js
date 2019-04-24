const express = require("express");

const { isAuthenticated } = require("../middleware");
const { codes } = require("../../shared/http");
const posts = require("../database/posts"); 
const router = express.Router();

router.get("/posts", isAuthenticated, (req, res) => {

    // all posts that user has access to (written by him/her or friends)
    const timelinePosts = posts.retrieveForUser(req.user);
    res.status(codes.OK).send(timelinePosts);
});

router.get("/posts/:id", isAuthenticated, async (req, res) => {

	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		res.status(codes.BAD_REQUEST).send();
		return;
	}

	const post = posts.retrieve(id);
    
	if (!post) {
		res.status(codes.NOT_FOUND).send();
		return;
	}
    
	if (post.authorEmail !== req.user.email) {
		res.status(codes.UNAUTHORIZED).send(); 
		return; 
	}

	res.status(codes.OK).send(post);
});


module.exports = router;
