const React = require("react");
const { MemoryRouter } = require("react-router-dom");
const { mount, shallow } = require("enzyme");
const request = require("supertest");

const { NotFound } = require("../../src/client/notFound.jsx");
const { Home } = require("../../src/client/home.jsx");
const { app } = require("../../src/server/app");
const { asyncCheckCondition, overrideFetchWithAgent } = require("./mytest-utils");


describe("the not-found page.", () => {

    let wrapper; 

    beforeEach(() => {

        wrapper = mount(<MemoryRouter>
            <NotFound />
        </MemoryRouter>);
    });

    it("links back to home", () => {

        const link = wrapper.find("#notFound-link").get(0);
        expect(link).toBeDefined();
        expect(wrapper.text()).toContain("Go home");
    });

    it("brings user home on click", async () => {

		let page = null;
		const history = {push: (h) => {page=h}};
		wrapper = mount(
			<MemoryRouter initialEntries={["/not-valid"]}>
				<NotFound history={history} />
			</MemoryRouter>
		);

		const link = wrapper.find("#notFound-link").at(0);
		link.simulate("click");

		const redirected = await asyncCheckCondition(
			() => {return page === "/"},
			2000,200);

		wrapper.update();
		expect(redirected).toBe(true);
		expect(wrapper.html().includes("Home"));
    });

    it("is displayed on invalid routes", () => {


    });
});