const React = require("react");
const { shallow } = require("enzyme");
const { app } = require("../../src/server/app");
const { App } = require("../../src/client/app.jsx");
const { overrideWebSocket } = require("../mytest-utils");


let server; 
let port; 

describe("The app page", () => {


	it("renders something", () => {

		const html = shallow(<App />).html();
		expect(html).toBeDefined();
	});

	it("has no logged in user on startup", () => {

		const wrapper = shallow(<App />);
		const user = wrapper.state().user;

		expect(user).toBeNull();
	});
});