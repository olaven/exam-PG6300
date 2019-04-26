const React = require("react");
const { MemoryRouter } = require("react-router-dom");
const { mount, shallow } = require("enzyme");
const request = require("supertest");
const { getDevUser } = require("../../../src/server/database/demo");
const { app } = require("../../../src/server/app");
const { asyncCheckCondition, overrideFetch, overrideFetchWithAgent } = require("../../mytest-utils");
const { Conversations } = require("../../../src/client/pages/conversations");


const getConversations = (props) => shallow(
    <Conversations {...props} />
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

describe("The conversations-page", () => {

    beforeAll(async () => {

        const agent = await getLoggedInAgent(); 
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

    it.only("does show friends when logged in", async () => {

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