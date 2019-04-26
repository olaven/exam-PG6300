const React = require("react");
const { MemoryRouter } = require("react-router-dom");
const { mount } = require("enzyme");

const { getDevUser } = require("../../../src/server/database/demo"); 
const { asyncCheckCondition, overrideFetchWithAgent, getLoggedInAgentAs } = require("../../mytest-utils"); 
const { Friends } = require("../../../src/client/pages/friends.jsx");


const getFriends = (props) => mount(
    <MemoryRouter>
        <Friends {...props} />
    </MemoryRouter>
);


describe("The friends-page", () => {

    beforeAll(async () => {

        const agent = await getLoggedInAgentAs(getDevUser()); 
        overrideFetchWithAgent(agent); 
    })

    it("renders friends", async () => {

        const wrapper = getFriends(); 

        await asyncCheckCondition(() => {
            
            wrapper.update(); 
            return wrapper.find(".friend-profile").exists()
        }, 2000, 100); 

        const profiles = wrapper.find(".friend-profile"); 
        expect(profiles.exists()).toBe(true)
    })
});