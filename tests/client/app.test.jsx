const React = require("react");
const { mount } = require("enzyme");
const { App } = require("../../src/client/app.jsx");
const { overrideWebSocket } = require("../mytest-utils");

describe("The app page", () => {

	beforeAll(() => {

		overrideWebSocket();
	});

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