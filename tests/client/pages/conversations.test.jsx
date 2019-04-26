const React = require("react");
const { shallow } = require("enzyme"); 

const { getDevUser } = require("../../../src/server/database/demo");
const { asyncCheckCondition, overrideFetchWithAgent, getLoggedInAgentAs } = require("../../mytest-utils");
const { Conversations } = require("../../../src/client/pages/conversations");


const getConversations = (props) => shallow(
    <Conversations {...props} />
);


describe("The conversations-page", () => {

    beforeAll(async () => {

        const agent = await getLoggedInAgentAs(getDevUser()); 
        overrideFetchWithAgent(agent); 
    })

    it("does not render when user is not logged in", () => {

        const wrapper = getConversations({user: null}); 
        const page = wrapper.get("#conversations-page"); 
        expect(page).toBeUndefined()
    }); 

    it("does fetch users when logged in", async () => {

        const wrapper = getConversations({
            user: getDevUser()
        });

        wrapper.state()//?

        await asyncCheckCondition(() => {
            return wrapper.state().friends.length > 0; 
        }, 1000, 50); 

        expect(wrapper.state().friends.length).toBeGreaterThan(0); 
    })

    it("does show friends when logged in", async () => {

        const wrapper = getConversations({
            user: getDevUser()
        });
        

        await asyncCheckCondition(() => {
            return wrapper.find(".friend-conversations").length > 0; 
        }, 1000, 50);

        expect(wrapper.find(".friend-conversations").length).toBeGreaterThan(0); 
        expect(wrapper.state().friends.length).toBeGreaterThan(0); 
    });
});