const nanoid = require("nanoid"); 
let friendRequests = [];

const persist = (from, to) => {

	const request = {
		from: from,
		to: to,
		id: nanoid()
	}; 
    
	friendRequests.push(request); 
	return request.id; 
};

const retrieveFrom = from => 
	friendRequests.filter(request => request.from === from); //? 

const retrieveTo = to => 
	friendRequests.filter(request => request.to === to); 

const retrieveById = id => 
	friendRequests.find(request => request.id === id); 

const remove = id => {
	friendRequests = friendRequests
		.filter(request => request.id !== id);
};

const clear = () => {
	friendRequests.length = 0; 
};


module.exports = {
	persist,
	retrieveFrom, 
	retrieveTo, 
	retrieveById,
	remove, 
	clear
};