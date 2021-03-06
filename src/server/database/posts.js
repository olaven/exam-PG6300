const nanoid = require("nanoid");
const { addDemoPosts } = require("./demo"); 

// id - dish 
const posts = new Map();

if (process.env.ENVIRONMENT !== "production") {
	addDemoPosts(posts); 
}

/**
 *  Persist into db. 
 * 	Returns the persisted item (with timestamp and id)
 */
const persist = post => {

	/* 
        collision probability similar to UUID v4 (https://github.com/ai/nanoid#normal). 
        In other words, collisions are _extremely unlikey_ to occur. 
        However, I will avoid collisions explicitly because: 
        1: social media sites are (deally) used by a lot of people 
        2: users may use posts to store personal information
    */
	let id = nanoid();
	while(posts.get(id)) {
		id = nanoid(); 
	}

	post.id = id;
	post.timestamp = new Date().getMilliseconds();
	posts.set(id, post);
	return post; 
};

const retrieveForUser = (user) => Array.from(posts.values())
	.filter(post => 
		post.authorEmail === user.email || user.friendEmails.includes(post.authorEmail)
	); 
	
const retrieveByUser = (user) => Array.from(posts.values())
	.filter(post =>
		post.authorEmail === user.email 
	);

const retrieveByAuthorEmails = (emails) => Array.from(posts.values())
	.filter(post => 
		emails.includes(post.authorEmail)	
	); 

const retrieve = id =>
	posts.get(id);
    
const retrieveAll = () => 
	Array.from(posts.values()); 


const update = (post) => {

	const old = posts.get(post.id);
	if (!old) throw "cannot update dish that doesn't exist";

	posts.set(post.id, post);
	return post;
};

const remove = (id) => {

	if (!posts.get(id)) {
		return false;
	}
	posts.delete(id);
	return true;
};

const clear = () => {

	posts.clear();
};


module.exports = {
	persist,
	retrieve,
	retrieveForUser,
	retrieveAll, 
	retrieveByUser,
	retrieveByAuthorEmails,
	update,
	remove,
	clear,
};
