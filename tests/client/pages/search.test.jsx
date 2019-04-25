const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { app } = require("../../../src/server/app");
const { getTestUser } = require("../clientTestUtils");
const { overrideFetch } = require("../../mytest-utils");
const { Search } = require("../../../src/client/pages/search");

const getSearch = props => shallow(<Search {...props}/>)

describe("the search page.", () => {

    beforeAll(() => {
        overrideFetch(app); 
    }); 

    it("is is not visible if not logged in, even if results are present in state", () => {

        const wrapper = getSearch({
            user: null
        }); 
        wrapper.setState({
            results: [{email: "some@email.com"}]
        }); 
        
        const rendered = wrapper.find(".user-search-result"); 
        expect(rendered.exists()).toBe(false); 
    }); 

    it("is is visible if logged in", () => {

        const wrapper = getSearch({
            user: {
                email: "user@mail.com"
            }
        });

        const results = [
            { email: "first@mail.com" },
            { email: "second@mail.com" }
        ]; 

        wrapper.setState({
            results: [results]
        });

        const rendered = wrapper.find(".user-search-result");
        expect(rendered.exists()).toBe(true);
    }); 

   

});