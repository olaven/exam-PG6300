const conversations = require("../../../src/server/database/conversations"); 

describe("The conversations-database", () => {

    beforeEach(() => {
        conversations.clearConversations(); 
    }); 

    it("can add messages and retrieve based on correct participants", () => {

        const participants = ["a", "b"]; 
        
        conversations.addMessage("a", "get me 1", participants); 
        conversations.addMessage("b", "get me 2", participants);
        conversations.addMessage("a", "NOT ME", ["a", "c"]); 


        const conversation = conversations.retrieveByParticipants(participants); 
        const messages = conversation.messages; 
        
        expect(messages.length).toEqual(2); 
        messages.forEach(message => {
            expect(message.text === "NOT ME").toBe(false)
        }); 
    })
})