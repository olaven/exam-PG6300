

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

const addMessage = (author, participants, text) => {

	const conversation = retrieveByParticipants(participants); 
	//add to existing conversation if present. 
	if (conversation) {
		conversation.messages.add({
			text: text, 
			timestamp: new Date().getMilliseconds()		
		}); 
	} else {
		//crate a new one otherwise 
		conversations.push({
			participants: participants, 
			messages: [
				{
					author: author, 
					text: text, 
					timestamp: new Date().getMilliseconds() 
				}
			]
		}); 
	}
};

const retrieveByParticipants = participants => 
	conversations.find(conversation =>
		conversation.participants
		.every(participant =>
			participants.includes(participant)
		)
	)

module.exports = {
	getAll, 
	addMessage
};