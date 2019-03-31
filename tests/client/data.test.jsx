const React = require('react');
const { MemoryRouter } = require('react-router-dom');
const { mount, shallow } = require('enzyme');
const { Data } = require("../../src/client/data.jsx");
const { app } = require("../../src/server/app"); 
const { overrideFetch, asyncCheckCondition } = require("./mytest-utils"); 

async function waitForData(wrapper) {

    const updated = await asyncCheckCondition(() => {
        
        wrapper.update();
        const data = wrapper.state().data; 
        
        return data.length !== 0
    }, 4000, 100);

    return updated;
}

describe("the data page.", () => {

    it("does show something.", () => {

        const wrapper = shallow(<Data />) ;
        const data = wrapper.find("#data"); 

        expect(data).not.toBeNull(); 
    });

    it("renders all items from server.", async () => {

        overrideFetch(app); 
        console.log("fetch overriden: ", fetch); 
        const wrapper = mount(<Data />);

        await waitForData(wrapper); 
    
        const rows = wrapper.find(".dataTableRow"); 
        console.log("fetch defined in test scope: ", fetch); 
        expect(rows.length).toBeGreaterThan(2); 
    }); 

});