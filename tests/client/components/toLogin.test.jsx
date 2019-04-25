const React = require("react");
const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { ToLogIn } = require("../../../src/client/components/toLogIn"); 

const getToLogin = (props) => {

    const routerWrapper = mount(
        <MemoryRouter initialEntries={["/login"]}>
            <ToLogIn />
        </MemoryRouter>
    );


    return routerWrapper.find(ToLogIn);
};



describe("The component with link to login.", () => {


    it("renders something", () => {

        const wrapper = getToLogin(); 
        const html = wrapper.html(); 

        expect(html).not.toBeNull()
    })

    it("renders primary button inside of <a>-link", () => {

        const wrapper = getToLogin();
        const html = wrapper.html();
        
        const expected = "<a href=\"/signup\"><button class=\"btn btn-primary\">sign up!</button></a"
        expect(html.includes(expected)).toBe(true); 
        
    })
});