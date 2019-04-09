const React = require('react');
const { MemoryRouter } = require('react-router-dom');
const { mount, shallow } = require('enzyme');
const { Data } = require("../../src/client/data.jsx");
const { app } = require("../../src/server/app"); 
const { overrideFetch, asyncCheckCondition, stubFetch } = require("./mytest-utils"); 

async function waitForData(wrapper) {

    const updated = await asyncCheckCondition(() => {
        
        wrapper.update();

        // have to find actual component inside MemoryRouter
        const dataComponent = wrapper.find(Data)
        const data = dataComponent.state().data; 
        
        return data.length !== 0
    }, 4000, 100);

    return updated;
}

describe("the data page.", () => {

    it("does show something.", () => {

        const wrapper = mount(<MemoryRouter>
            <Data />
        </MemoryRouter>) ;
        const data = wrapper.find("#data"); 

        expect(data).not.toBeNull(); 
    });

    it("renders all items from server.", async () => {

        overrideFetch(app); 
        
        const wrapper = mount(<MemoryRouter initialEntries={["/data"]}>
            <Data />
        </MemoryRouter>);

        await waitForData(wrapper); 
    
        const data = wrapper.state().data;
        const rows = wrapper.find(".dataTableRow"); 
        //console.log("fetch defined in test scope: ", fetch); 
        
        expect(rows.length).toEqual(data.length); 
        expect(rows.length).toBeGreaterThan(0);
    }); 
});