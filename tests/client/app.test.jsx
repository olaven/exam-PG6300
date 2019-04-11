const React = require("react");
const { mount } = require("enzyme");
const { App } = require("../../src/client/app.jsx");


describe("The app page", () => {

	it("renders something", () => {

		const html = mount(<App />).html();
		expect(html).toBeDefined();
	});

	it("has no logged in user on startup", () => {

		const wrapper = mount(<App />);
		const username = wrapper.state().username;

		expect(username).toBeNull();
	});

	it("contains header when rendered", () => {

		const wrapper = mount(<App />);
		const html = wrapper.html(); 

		expect(html).toContain("id=\"header\"");
	});
});