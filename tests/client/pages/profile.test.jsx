const React = require("react");
const { shallow } = require("enzyme");

const { getDevUser } = require("../../../src/server/database/demo");
const { Profile } = require("../../../src/client/pages/profile");

const getProfile = props => shallow(<Profile {...props} />)

describe("The profile page.", () => {

    it("does not render if not loggedIn", () => {
        
        const wrapper = getProfile({user: null}); 
        const page = wrapper.find(".profile-page"); 
        expect(page.exists()).toBe(false); 
    }); 

    it("does render when user is defined", () => {

        const wrapper = getProfile({ user: getDevUser() });
        const page = wrapper.find(".profile-page");
        expect(page.exists()).toBe(true);
    }); 
});