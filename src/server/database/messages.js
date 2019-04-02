//TODO replace with json file 
const database = [];

const getAll = () => {

	return database;
};

const addMessage = (message) => {

	database.push(message);
};

module.exports = {
	getAll, 
	addMessage
};