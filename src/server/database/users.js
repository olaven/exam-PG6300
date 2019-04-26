const { addDemoUsers } = require("./demo"); 

// the email is key, and full user is value 
let users = new Map();

if (process.env.ENVIRONMENT !== "production") {
	
	addDemoUsers(users); 
} 

const getUser = (email) => {

	return users.get(email);
};

const verifyUser = (email, password) => {

	const user = users.get(email);
	if (!user) return false;
	return user.password === password;
};

const addFriends = (first, second) => {

	first;//? 
	second;//?
	// NOTE: just making absolutely sure they are not friends already
	if (
		users.get(first).friendEmails.includes(second) || 
		users.get(second).friendEmails.includes(first)) {
		return; 
	}

	users.get(first).friendEmails.push(second); 
	users.get(second).friendEmails.push(first);
};

const getAllUsers = () => 
	Array.from(users.values()); 



const createUser = (email, givenName, familyName, dateOfBirth, location, password) => {

	const exists = users.get(email);
	if (exists) {
		return false;
	}
	
	
	const user = {
		email: email, 
		givenName: givenName, 
		familyName: familyName, 
		dateOfBirth: dateOfBirth, 
		location: location,
		password: password,
		friendEmails: []
	};


	users.set(email, user);
	return true;
};

const updateUser = (user) => {

	// The data that the user is not allowed to edit
	const old = users.get(user.email); 
	user.password = old.password; 
	user.friendEmails = old.friendEmails; 
	
	users.set(user.email, user); 
}

const clearUsers = () => {

	users = new Map();
};

module.exports = {
	getUser,
	getAllUsers, 
	verifyUser,
	createUser,
	addFriends, 
	updateUser, 
	clearUsers
};
