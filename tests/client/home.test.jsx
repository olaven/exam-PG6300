const React = require('react');
const { mount, shallow } = require('enzyme');
const { Home } = require("../../src/client/home.jsx");

describe("the home page.", () => {

    it("renders some content.", () => {

        const driver = shallo(<Home />);
        const home = driver.find("#home");

        expect(home).not.toBeNull();
    });
});