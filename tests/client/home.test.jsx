const React = require('react');
const { MemoryRouter } = require('react-router-dom');
const { mount, shallow } = require('enzyme');
const { Home } = require("../../src/client/home.jsx");

const getHome = () => {

    return shallow(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    )
} 

describe("the home page.", () => {

    it("renders some content.", () => {

        const driver = shallow(<Home />);
        const home = driver.find("#home");

        console.log
        expect(home).not.toBeNull();
    });

    it("only renders one message only", () => {
        
        const driver = shallow(<Home />).renderdive();
        const messages = driver.find(".homeMessage");
        expect(messages.length).toEqual(1)

        const message = messages.first();
        expect(message.text()).toEqual("You must log in.");
    });

    it("renders message to login when user logged out", () => {

    });

    it("renders data-message when user logged in", () => {

        const username = "test user";
        const updateLoggedInUser = () => new Promise(resolve => resolve());
        const driver = mount(
            <MemoryRouter initialEntries={["/home"]}>
                <Home updateLoggedInUser={updateLoggedInUser} username={username} />
            </MemoryRouter>
        );
    });
});