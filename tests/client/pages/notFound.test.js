const React = require("react");
const { MemoryRouter} = require("react-router-dom");
const { mount } = require("enzyme");
const { NotFound } = require("../../../src/client/pages/notFound.jsx");


const mountNotFound = (entries) => mount(
	<MemoryRouter>
		<NotFound initialEntries={[entries]}/>
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