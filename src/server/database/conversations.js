

/**
 * NOTE: conversations look like this: 
 * {
 * 	participants: [emailOne, emailTwo..]
 * 	messages: [
 * 	text: "some message"
 * 	author: "some@mail.com"
 * 	timestanmp: new Date().getMilliSeconds()
 * ]
 * }
 */
const conversations = [];


const getAll = () => {

	return conversations;
};

//adds and returns a message to correct conversation
const addMessage = (author, text, participants) => {

	const conversation = retrieveByParticipants(participants); 
	const message = {
		author, 
		text, 
		timestamp: new Date().getMilliseconds() 
	};
	//add to existing conversation if present. 
	if (conversation) {
		conversation.messages.push(message); 
	} else {
		//crate a new one otherwise 
		conversations.push({
			participants: participants, 
			messages: [ message ]
		}); 
	}

	return message; 
};

const retrieveByParticipants = participants => {
	const conversation = conversations.find(conversation => {
		const currentParticipants = conversation.participants; 
		if (currentParticipants.every(p => 
			participants.includes(p)
		)) {
			return true; 
		} else {
			return false; 
		}
	}); 

	return conversation; 
};

const clearConversations = () => {
	conversations.length = 0
}


module.exports = {
	addMessage,
	retrieveByParticipants, 
	clearConversations
};