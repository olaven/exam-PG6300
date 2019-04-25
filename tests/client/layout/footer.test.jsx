const React = require("react");
const { mount } = require("enzyme");
const { Footer } = require("../../../src/client/layout/footer"); 

describe("The footer", () => {

    it("shows username if the user is logged in", () => {

        const givenName = "Test name"; 
        const user = {
            givenName
        }
        const wrapper = mount(<Footer user={user}/>); 

        wrapper.html()//?
        expect(wrapper.html().includes(givenName)).toBe(true); 
    }); 

    it("shows \"you great person\" if not", () => {


        const wrapper = mount(<Footer user={null} />); 

        wrapper.html()//?
        expect(wrapper.html().includes("you great person")).toBe(true); 
    })
});