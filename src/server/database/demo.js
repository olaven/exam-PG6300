const nanoid = require("nanoid"); 

/**
 * Adding demo data for use in development mode 
 */

const getDevUser = () => {
	return {
		email: "dev@admin.com",
		password: "dev",
		givenName: "DEV_GIVEN",
		familyName: "DEV_FAMILY_NAME",
		dateOfBirth: "04-24-1960", 
		location: "Oslo",
		friendEmails: ["gandalf@arda.com", "sam@shire.com"],
		postIds: []
	};
};




const demoUsers = [
	getDevUser(), 
	{
		email: "frodo@shire.com",
		password: "secretly_wanting_that_ring",
		givenName: "Frodo",
		familyName: "Baggins",
		dateOfBirth: "09-24/1968", 
		location: "The Shire",
		friendEmails: ["sam@shire.com", "merry@shire", "pippin@shire", "gandalf@arda.com"]
	}, 
	{
		email: "sam@shire.com",
		password: "rosie",
		givenName: "Sam",
		familyName: "Gamgee",
		dateOfBirth: "04-29-1980", 
		location: "The Shire",
		friendEmails: [
			"dev@admin.com", "frodo@shire.com", 
			"merry@shire.com", "pippin@shire.com"
		]
	}, 
	{
		email: "merry@shire.com",
		password: "pints!",
		givenName: "Meriadoc",
		familyName: "Brandybuck",
		dateOfBirth: "04-11-1982",
		location: "The Shire",
		friendEmails: ["frodo@shire.com", "sam@shire.com", "pippin@shire.com"]
	}, 
	{
		email: "pippin@shire.com",
		password: "Not-a-fool.",
		givenName: "Peregrin",
		familyName: "Took",
		dateOfBirth: "12-12-1990", 
		location: "The Shire",
		friendEmails: ["frodo@shire.com", "sam@shire.com", "merry@shire.com"]
	}, 
	{
		email: "gandalf@arda.com",
		password: "runrunrun",
		givenName: "Gandalf",
		familyName: "the Grey",
		dateOfBirth: "10-12-300",
		location: "Everywhere, really",
		friendEmails: ["frodo@shire.com", "dev@admin.com"]
	}
];

const demoPosts = [
	{
		id: nanoid(), 
		title: "Amazing trip", 
		authorEmail: "gandalf@arda.com", 
		content: "Had a lovely trip with Shadowfax today!",
		timestamp: new Date().getMilliseconds() 
	}, 
	{
		id: nanoid(),
		title: "Vanilla or chocolate?",
		authorEmail: "gandalf@arda.com",
		content: "Come visit me for some ice cream!",
		timestamp: new Date().getMilliseconds()
	}, 
	{
		id: nanoid(),
		title: "The woods.",
		authorEmail: "frodo@shire.com",
		content: "I went for a walk in the woods.",
		timestamp: new Date().getMilliseconds()
	}, 
	{
		id: nanoid(),
		title: "Smokey.",
		authorEmail: "gandalf@arda.com",
		content: "I am smoking from my pipe today. And tomorrow.",
		timestamp: new Date().getMilliseconds()
	}, 
	{
		id: nanoid(),
		title: "Let me know!",
		authorEmail: "pippin@shire.com",
		content: "Let me know if anything happens!",
		timestamp: new Date().getMilliseconds()
	}, 
	{
		id: nanoid(),
		title: "How's it down there?",
		authorEmail: "merry@shire.com",
		content: "I have been getting taller lately.",
		timestamp: new Date().getMilliseconds()
	}, 
	{
		id: nanoid(),
		title: "Frodo and gardening.",
		authorEmail: "sam@shire.com",
		content: "Master Frodo is almost as nice as my plants at home.",
		timestamp: new Date().getMilliseconds()
	}
]; 

const addDemoUsers = users => {
	demoUsers.forEach(user => {
		users.set(user.email, user); 
	}); 
};

const addDemoPosts = posts => {
	demoPosts.forEach(post => {
		posts.set(post.id, post);
	});
};

module.exports = {
	addDemoUsers, 
	addDemoPosts,
	getDevUser
};