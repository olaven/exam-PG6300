const React = require("react");
const { mount } = require("enzyme");

const { app } = require("../../../src/server/app");
const friendRequests = require("../../../src/server/database/friendRequests"); 
const { overrideFetch, asyncCheckCondition } = require("../../mytest-utils"); 
const { getDevUser } = require("../../../src/server/database/demo"); 
const request = require("supertest"); 
const { MemoryRouter } = require("react-router-dom");

const { FriendRequestsView } = require("../../../src/client/components/friendRequestsView");

const getFriendRequestView = (props) => mount(
    <FriendRequestsView {...props} />
);


describe("The view of a post.", () => {


    beforeAll(() => {
        overrideFetch(app); 
    }); 

    it("has content", () => {

        const wrapper = getFriendRequestView({
            email: "dev@admin.com"
        });

        expect(wrapper.html().length).toBeGreaterThan(0);
    }); 

    it("renders message if no friend requests", () => {

        const wrapper = getFriendRequestView({
            email: "dev@admin.com"
        }); 

        const message = wrapper.find("#no-requests-message").at(0); 
        expect(message).toBeDefined(); 
    }); 

    it("renders requests when they are present", () => {

        const wrapper = getFriendRequestView({
            email: "dev@admin.com"
        }); 

        wrapper.setState({
            friendRequests: [
                { from: "frodo@shire.com", id: "mock-id-1" }, 
                { from: "merry@shire.com", id: "mock-id-2" }
            ]
        }); 

        const renderedRequests = wrapper.find(".friend-request");
        expect(wrapper.state().friendRequests.length).toBe(2);
        expect(renderedRequests.length).toEqual(2); 
    }); 

    it("displays error if fetching and request is somehow wrong", async () => {

        // NOTE: in this case, the user is not logged in, and received 401

        overrideFetch(app); 

        friendRequests.persist("merry@shire.com", "dev@admin.com"); 
        friendRequests.persist("pippin@shire.com", "dev@admin.com"); 

        const wrapper = getFriendRequestView({username:"dev@admin.com"}); 
        wrapper.setState({
            friendRequests: [
                { from: "frodo@shire.com", id: "mock-id-1" },
            ]
        }); 

        await asyncCheckCondition(() => {
            wrapper.update(); 
            wrapper.html().includes("some error occured.."); //?
            return wrapper.html().includes("some error occured.."); 
        }, 200, 10); 

        
        expect(wrapper.html().includes("some error occured..")).toBe(true); 
    }); 

    it("it renders buttons for accepting and denying", async () => {

    
        friendRequests.persist("merry@shire.com", "dev@admin.com");

        const wrapper = getFriendRequestView({ username: "dev@admin.com" });
        wrapper.setState({
            friendRequests: [
                { from: "merry@shire.com", id: "mock-id-1" },
            ]
        });

        const accept = wrapper.find(".answer-request-accept").at(0);
        const deny = wrapper.find(".answer-request-deny").at(0);
        
        expect(accept).toBeDefined(); 
        expect(deny).toBeDefined(); 
    });  
});