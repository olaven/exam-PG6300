
// the email is key, and full user is value 
let database = new Map();

if (process.env.ENVIRONMENT !== "production") {
	
	database.set("dev@admin.com", {
		email: "dev@admin.com", 
		password: "dev",
		givenName: "DEV_GIVEN", 
		familyName: "DEV_FAMILY_NAME",
		dateOfBirth: "24/04/1080",//new Date().toLocaleDateString(),
		location: "Oslo", 
		friendEmails: [], //TODO: Add som friends, 
		postIds: [] //TODO: reference some posts 
	});
}

const getUser = (email) => {

	return database.get(email);
};

const verifyUser = (email, password) => {

	const user = database.get(email);
	if (!user) return false;
	return user.password === password;
};

const createUser = (email, password) => {

	const exists = database.get(email);
	if (exists) {
		return false;
	}
	
	
	const user = {
		email: email, 
		password: password
		//TODO: add more user data 
	};

	database.set(email, user);
	return true;
};

const clearUsers = () => {

	database = new Map();
};

module.exports = {
	getUser,
	verifyUser,
	createUser, 
	clearUsers
};
