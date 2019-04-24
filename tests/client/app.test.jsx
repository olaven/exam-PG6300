const React = require("react");
const { mount } = require("enzyme");
const { app } = require("../../src/server/app");
const { App } = require("../../src/client/app.jsx");
const { overrideWebSocket } = require("../mytest-utils");


let server; 
let port; 

describe("The app page", () => {

	beforeAll((done) => {

		server = app.listen(0, () => {
			port = server.address().port; //?
			overrideWebSocket(port);
			done();
		});
	});

	afterAll(() => {
		server.close();
	});


	it("renders something", () => {

		const html = mount(<App />).html();
		expect(html).toBeDefined();
	});

	it("has no logged in user on startup", () => {

		const wrapper = mount(<App />);
		const user = wrapper.state().user;

		expect(user).toBeNull();
	});
});