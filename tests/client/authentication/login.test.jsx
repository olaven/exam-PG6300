/**
 * NOTE: This file is partially copied from: 
 * * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/login-test.jsx
 */

const React = require("react");
const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { overrideFetch, asyncCheckCondition } = require("../../mytest-utils");
const { app } = require("../../../src/server/app");
const { Login } = require("../../../src/client/authentication/login");
const { clearUsers, createUser } = require("../../../src/server/database/users");


const fillForm = (wrapper, username, password) => {

	const usernameInput = wrapper.find("#usernameInput").at(0);
	const passwordInput = wrapper.find("#passwordInput").at(0);
	const signupButton = wrapper.find("#loginButton").at(0);


	usernameInput.simulate("change", { target: { value: username } });
	passwordInput.simulate("change", { target: { value: password } });

	signupButton.simulate("click");
};

describe("The login page", () => {

	beforeAll(() => {
		
		overrideFetch(app);
	});

	beforeEach(clearUsers);

	it("fails to login on invalid input", async () => {

		const wrapper = mount(
			<MemoryRouter initialEntries={["/login"]}>
				<Login />
			</MemoryRouter>
		);

		fillForm(wrapper, "foo", "123");

		const error = await asyncCheckCondition(
			() => { wrapper.update(); return wrapper.html().includes("Invalid username/password"); },
			2000, 200);

		expect(error).toEqual(true);
	});

	it("lets user log in with valid input", async () => {

		const username = "Foo";
		const password = "123";
		createUser(username, password);

		const updateLoggedInUser = () => new Promise(resolve => resolve());
		let page = null;
		const history = { push: (h) => { page = h; } };

		const wrapper = mount(
			<MemoryRouter initialEntries={["/signup"]}>
				<Login updateLoggedInUser={updateLoggedInUser} history={history} />
			</MemoryRouter>
		);

		fillForm(wrapper, username, password);

		const redirected = await asyncCheckCondition(
			() => { return page === "/"; },
			2000, 200);

		expect(redirected).toEqual(true);
	});
});
