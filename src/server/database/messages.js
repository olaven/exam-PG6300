
const messagse = [];

const getAll = () => {

	return messagse;
};

const addMessage = (message) => {

	messagse.push(message);
};

module.exports = {
	getAll, 
	addMessage
};