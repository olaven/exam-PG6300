const React = require("react");
const { MemoryRouter } = require("react-router-dom");
const { shallow, mount } = require("enzyme");
const request = require("supertest"); 
const { getDevUser } = require("../../../src/server/database/demo"); 
const { app } = require("../../../src/server/app"); 
const { asyncCheckCondition, overrideFetch, overrideFetchWithAgent } = require("../../mytest-utils"); 
const { Friends } = require("../../../src/client/pages/friends.jsx");


const getFriends = (props) => mount(
    <MemoryRouter>
        <Friends {...props} />
    </MemoryRouter>
);

const getLoggedInAgent = async () => {

    const devUser = getDevUser();
    const agent = await request.agent(app);
    let loginResponse = await agent
        .post("/api/login")
        .send({
            email: devUser.email,
            password: devUser.password
        })
        .set("Content-Type", "application/json");
    return agent;
}

describe("The friends-page", () => {

    beforeAll(async () => {

        const agent = await getLoggedInAgent(); 
        overrideFetchWithAgent(agent); 
    })

    it.only("renders friends", async () => {

        const errorMessage = "Test error message"; 
        const wrapper = getFriends(); 

        await asyncCheckCondition(() => {
            
            wrapper.update(); 
            return wrapper.find(".friend-profile").exists()
        }, 2000, 100); 

        const profiles = wrapper.find(".friend-profile"); 
        expect(profiles.exists()).toBe(true)
    })
});