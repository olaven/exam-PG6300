const React = require("react");
const { mount, MemoryRouter } = require("enzyme");
const { Header } = require("../../../src/client/layout/header.jsx"); 

const getHeader = (props) => {

    const routerWrapper = mount(
        <MemoryRouter initialEntries={["/login"]}>
            <Header {...props}/>
        </MemoryRouter>
    );


    return routerWrapper.find(Header);
};
describe.skip("The header", () => {

    it("shows home, login and signup when logged out", () => {

        const wrapper = getHeader({user: {email:"dev@admin.com"}}); 
        
        const home = wrapper.find("#header-link-home").at(0)
        const login = wrapper.find("#header-link-login").at(0)
        const signup = wrapper.find("#header-link-signup").at(0)        

        expect(home.exists()).toBe(true); 
        expect(login.exists()).toBe(true); 
        expect(signup.exists()).toBe(true); 
    });

    it("shows home and logout when logged in", () => {


        
    })
});