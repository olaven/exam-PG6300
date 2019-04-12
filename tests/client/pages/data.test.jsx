const React = require("react");
const { MemoryRouter } = require("react-router-dom");
const { mount } = require("enzyme");
const request = require("supertest");

const { Data } = require("../../../src/client/pages/data.jsx");
const { app } = require("../../../src/server/app");
const { asyncCheckCondition, overrideFetchWithAgent } = require("../../mytest-utils");

const agent = request.agent(app);

beforeEach(async () => {

    // I have to login, as the API is protected.
	let response = await agent
		.post("/api/signup")
		.send({
			username: "foo" + Math.random(1000),
			password: "bar"
		})
		.set("Content-Type", "application/json");

	expect(response.statusCode).toBe(201);

	// NOTE: overriding with the agent allows me to keep cookies
	overrideFetchWithAgent(agent);
});



describe("the data page.", () => {

	it("does show something.", () => {

		const wrapper = mount(<MemoryRouter>
			<Data />
		</MemoryRouter>);
		const data = wrapper.find("#data").get(0);

		expect(data).not.toBeNull();
	});

	it("shows header when logged in", () => {

		const wrapper = mount(<MemoryRouter>
			<Data />
		</MemoryRouter>);
		const data = wrapper.find("#data-header").get(0);

		expect(data).not.toBeNull();
	});

	it("shows error when not logged in", async () => {

		const wrapper = mount(<MemoryRouter>
			<Data username={null} />
		</MemoryRouter>);


		const data = wrapper.find("#data-header").get(0);
		const error = wrapper.find("#data-error").get(0);

		expect(data).toBeUndefined();
		expect(error).toBeDefined();
	});

	// eslint-disable-next-line no-undef
	it("renders all items from server.", async () => {

		const wrapper = mount(<MemoryRouter initialEntries={["/data"]}>
			<Data />
		</MemoryRouter>);

		// have to find actual component inside MemoryRouter
		const dataComponent = wrapper.find(Data);
		await asyncCheckCondition(() => {

			wrapper.update();
			dataComponent.update();

			return dataComponent.state().data.length > 0;
		}, 4000, 100);

		dataComponent.update();
		const data = dataComponent.state().data;
		const rows = wrapper.find(".dataTableRow");

		expect(data.length).toEqual(rows.length);
	});
});