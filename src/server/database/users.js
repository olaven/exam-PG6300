
let database = new Map();

if (process.env.ENVIRONMENT !== "production") {
	
	database.set("dev", {
		username: "dev", 
		password: "dev"
	});
}

const getUser = (username) => {

	return database.get(username);
};

const verifyUser = (username, password) => {

	const user = database.get(username);
	if (!user) return false;
	return user.password === password;
};

const createUser = (username, password) => {

	const exists = database.get(username);

	if (exists) {
		return false;
	}
    
	const user = {
		username: username, 
		password: password 
		//TODO: add more user data 
	};

	database.set(username, user);
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
