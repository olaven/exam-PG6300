

/**
 * NOTE: conversations look like this: 
 * {
 * 	participants: [emailOne, emailTwo..]
 * 	messages: [
 * 	text: "some message"
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
	}
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

const retrieveByParticipants = participants => 
	conversations.find(conversation =>
		conversation.participants
			.every(participant =>
				participants.includes(participant)
			)
	)


module.exports = {
	addMessage,
	retrieveByParticipants
};