/**
 * NOTE: This file is partially copied from: 
 * * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/signup-test.jsx
 */

const React = require("react");
const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { overrideFetch, overrideWebSocket, asyncCheckCondition } = require("../../mytest-utils");
const { app } = require("../../../src/server/app");

const { Signup } = require("../../../src/client/authentication/signup");
const { clearUsers, getUser, createUser } = require("../../../src/server/database/users");




const fillForm = (wrapper, email, password, repeatPassword) => {

	const emailInput = wrapper.find("#emailInput").at(0);
	const passwordInput = wrapper.find("#passwordInput").at(0);
	const repeatPasswordInput = wrapper.find("#repeatPasswordInput").at(0);
	const signupButton = wrapper.find("#signupButton").at(0);


	emailInput.simulate("change", { target: { value: email } });
	passwordInput.simulate("change", { target: { value: password } });
	repeatPasswordInput.simulate("change", { target: { value: repeatPassword } });

	signupButton.simulate("click");
};

let server; 
let port; 

describe("The signup-page", () => {


	beforeAll((done) => {

		server = app.listen(0, () => {
			port = server.address().port; //?
			overrideWebSocket(port);
			done();
		});

		overrideFetch(app);
	});

	afterAll(async (done) => {
		await server.close();
		done(); 
	});

	beforeEach(clearUsers);

	it("gives error when passwords are unequal", async () => {

		const mismatch = "Passwords do not match";
		const wrapper = mount(
			<MemoryRouter initialEntries={["/signup"]}>
				<Signup />
			</MemoryRouter>
		);

		expect(wrapper.html().includes(mismatch)).toEqual(false);

		fillForm(wrapper, "foo", "123", "not-matching");

		const error = await asyncCheckCondition(
			() => { wrapper.update(); return wrapper.html().includes(mismatch); },
			2000, 200);

		expect(error).toEqual(true);
	});


	it("can create a user", async () => {

		const email = "Foo";
		expect(getUser(email)).toEqual(undefined);

		const updateLoggedInUser = () => new Promise(resolve => resolve());
		let page = null;
		const history = { push: (h) => { page = h; } };

		const wrapper = mount(
			<MemoryRouter initialEntries={["/signup"]}>
				<Signup updateLoggedInUser={updateLoggedInUser} history={history} />
			</MemoryRouter>
		);

		const password = "123";

		fillForm(wrapper, email, password, password);


		const redirected = await asyncCheckCondition(
			() => { return page === "/"; },
			2000, 200);

		expect(redirected).toEqual(true);

		expect(getUser(email).email).toEqual(email);
	});


	it("fails if the user already exists", async () => {

		const email = "foo@test.com";
		const password = "123";
		createUser(email, password);
		
		const updateLoggedInUser = () => new Promise(resolve => resolve());
		let page = null;
		const history = { push: (h) => { page = h; } };

		const wrapper = mount(
			<MemoryRouter initialEntries={["/signup"]}>
				<Signup updateLoggedInUser={updateLoggedInUser} history={history} />
			</MemoryRouter>
		);

		fillForm(wrapper, email, password, password);

		const failed = await asyncCheckCondition(
			() => {
				wrapper.update();
				return wrapper.html().includes("Invalid email/password"); },
			3000, 200);

		expect(failed).toEqual(true);
	});
});
