const React = require("react");
const { MemoryRouter } = require("react-router-dom");
const { mount, shallow } = require("enzyme");
const request = require("supertest");
const { Data } = require("../../src/client/data.jsx");
const { app } = require("../../src/server/app");
const { overrideFetch, asyncCheckCondition, stubFetch, overrideFetchWithAgent } = require("./mytest-utils");

beforeAll(async () => {

    // I have to login, as the API is protected.
	const agent = request.agent(app);
	let response = await agent
		.post("/api/signup")
		.send({
			username: "foo",
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
		</MemoryRouter>) ;
		const data = wrapper.find("#data");

		expect(data).not.toBeNull();
	});

	it("renders all items from server.", async () => {

		const wrapper = mount(<MemoryRouter initialEntries={["/data"]}>
			<Data/>
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