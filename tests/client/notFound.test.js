const React = require("react");
const { MemoryRouter, Link } = require("react-router-dom");
const { mount, shallow } = require("enzyme");
const request = require("supertest");

const { NotFound } = require("../../src/client/notFound.jsx");
const { Home } = require("../../src/client/home.jsx");
const { app } = require("../../src/server/app");
const { asyncCheckCondition, overrideFetchWithAgent } = require("./mytest-utils");


const basicWrapper = (entry) => mount(
	<MemoryRouter>
		<NotFound initialEntries={[entry]}/>
	</MemoryRouter>
);

const withHistory = (page) => {

	const history = {push: (h) => {page=h;}};
	return mount(
		<MemoryRouter>
			<NotFound history={history} />
		</MemoryRouter>
	);
};

const homeWithEntry = (entry) => mount(
	<MemoryRouter initialEntries={[entry]}>
		<Home />
	</MemoryRouter>
);



describe("the not-found page.", () => {

	it("has link to home", () => {
        
		const wrapper = basicWrapper();
		const link = wrapper.find("#notFound-link").get(0);
		expect(link).toBeDefined();
		expect(wrapper.text()).toContain("Go home");
	});

	it("brings user home on click", async () => {

		let page = null;
		const history = {push: (h) => {page = h;}};
		const wrapper = mount(<MemoryRouter>
			<NotFound history={history}/>
        </MemoryRouter>);
        
        const link = wrapper.find("#notFound-link").at(0);
		link.simulate("click");
        
		asyncCheckCondition(() => {
            wrapper.update();
			return page !== null;
        }, 4000, 100);
      
		expect(page).not.toBeNull();

	});

	it("is displayed on invalid routes", () => {

		expect(true).toBe(false);
	});
});