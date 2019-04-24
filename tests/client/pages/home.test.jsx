const React = require("react");
const { shallow } = require("enzyme");

const { getTestUser } = require("../clientTestUtils"); 
const { Home } = require("../../../src/client/pages/home.jsx");

const getHome = (props) => {

	return shallow(
		<Home
			{...props}/>
	);
}; 

describe("the home page.", () => {

	it("renders some content.", () => {

		const wrapper = getHome(null); 
		const home = wrapper.find("#home");

		expect(home).not.toBeNull();
	});

	it("only renders one message only", () => {
        
		const wrapper = getHome(null); 
		const messages = wrapper.find(".homeMessage");
		expect(messages.length).toEqual(1);
	});

	it("renders message to login when user logged out", () => {

		const wrapper = getHome({
			user: null 
		}); 
		const messages = wrapper.find(".homeMessage"); 
        
		const message = messages.first(); 
		expect(message.text()).toEqual("You must log in.");
	});

	it("renders data-message when user logged in", () => {

		const wrapper = getHome({
			user: getTestUser()
		}); 
		const messages = wrapper.find(".homeMessage");
		expect(messages.length).toEqual(1);
        
		const message = messages.first();
		expect(message.text()).toEqual("Go to data page"); 
	});
});