const React = require("react");
const { mount } = require("enzyme");
const { getDevUser } = require("../../../src/server/database/demo");
const { UserDetailsView } = require("../../../src/client/components/userDetailsView"); 
const { overrideFetch, overrideFetchWithAgent, getLoggedInAgentAs,asyncCheckCondition } = require("../../mytest-utils");

const getUserDetailsView = props => mount(<UserDetailsView {...props}/>)

describe("The user-details component", () => {


    it("user defined at once (i.e. not fetched) when already defined", () => {

        const wrapper = getUserDetailsView({user: getDevUser}); 
        expect(wrapper.props().user).toBeDefined(); 
    });

    it("fetches user otherwise", async () => {

        const user = getDevUser(); 
        const agent = await getLoggedInAgentAs(user)
        overrideFetchWithAgent(agent); 
        
        const wrapper = await getUserDetailsView({
            email: user.email
        }); 

    
        await asyncCheckCondition(() => {
            wrapper.update(); 
            return wrapper.state().user
        }, 2000, 100)

        expect(wrapper.state().user).toBeDefined(); 
    }); 

    it("shows appropriate error if users are not friends", async () => {
        
        //NOTE: this test assumes that devUser is not friends with "pippin@shire.com"
        const errorMessage = "You must befriend this user to view their profile."; 
        
        const user = getDevUser();
        const agent = await getLoggedInAgentAs(user)
        overrideFetchWithAgent(agent);

        const wrapper = await getUserDetailsView({
            email: "pippin@shire.com"
        });


        await asyncCheckCondition(() => {
            wrapper.update();
            return wrapper.html().includes(errorMessage);
        }, 2000, 100)

        expect(wrapper.html().includes(errorMessage)).toBe(true); 
    })

});