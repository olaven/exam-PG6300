const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { app } = require("../../../src/server/app");
const { getDevUser } = require("../../../src/server/database/demo"); 
const { overrideFetch, getLoggedInAgentAs, overrideFetchWithAgent, asyncCheckCondition } = require("../../mytest-utils");
const { Search } = require("../../../src/client/pages/search");

const getSearch = props => shallow(<Search {...props}/>)

describe("the search page.", () => {

    it("is is not visible if not logged in, even if results are present in state", () => {

        overrideFetch(app); 
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

        overrideFetch(app); 
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