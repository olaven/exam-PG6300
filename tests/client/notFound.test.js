const React = require("react");
const { MemoryRouter, Link, StaticRouter } = require("react-router-dom");
const { mount, shallow } = require("enzyme");
const request = require("supertest");

const { NotFound } = require("../../src/client/notFound.jsx");
const { Home } = require("../../src/client/home.jsx");
const { app } = require("../../src/server/app");
const { asyncCheckCondition, overrideFetchWithAgent } = require("./mytest-utils");


const mountNotFound = (entries) => mount(
	<MemoryRouter>
		<NotFound initialEntries={[entries]}/>
	</MemoryRouter>
);

const mountHome = (entries) => mount(
	<MemoryRouter>
		<Home initialEntries={[entries]}/>
	</MemoryRouter>
);



describe("the not-found page.", () => {

	it("has link to home", () => {
        
		const wrapper = mountNotFound([]);
		const link = wrapper.find("#notFound-link").get(0);
		expect(link).toBeDefined();
		expect(wrapper.text()).toContain("Go home");
	});

	it("Link links to home", async () => {

		let wrapper = mountNotFound();
		let link = wrapper.find("#notFound-link").get(0);

		expect(link.props.to).toEqual("/");
	});
});