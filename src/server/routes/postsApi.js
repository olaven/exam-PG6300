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

router.get("/posts/:id", async (req, res) => {

    const id = req.params.id
    id//? 
	if (!id) {
		res.status(codes.BAD_REQUEST).send("id must be included");
		return;
	}

	const post = posts.retrieve(id);
    
	if (!post) {
		res.status(codes.NOT_FOUND).send();
		return;
	}
    
	if (hasAccess(post, req.user)) {
		res.status(codes.UNAUTHORIZED).send(); 
		return; 
	}

	res.status(codes.OK).send(post);
});

router.delete("/posts/:id", isAuthenticated, async (req, res) => {

}); 

const hasAccess = (post, user) => {
    if (user.email === post.authorEmail) return true; 
    if (user.friendEmails.includes(post.authorEmail)) return true; 
    return false; 
}

module.exports = router;
