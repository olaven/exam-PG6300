const React = require("react");
const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { PostView } = require("../../../src/client/components/postView");


const getPostView = (props) => mount(
    <PostView {...props} />
);

describe("The view of a post.", () => {

    it("renders correct data", () => {

        const title = "Test post title"; 
        const content = "Test post content"; 
        const authorEmail = "Author of post"; 
        
        const wrapper = getPostView({
            post: { title, content, authorEmail }
        }); 

        const titleElement = wrapper.find(".post-view-title").at(0); 
        const contentElement = wrapper.find(".post-view-content").at(0);
        const authorElement = wrapper.find(".post-view-author").at(0);

        expect(titleElement.text()).toEqual(title); 
        expect(contentElement.text()).toEqual(content); 
        expect(authorElement.text()).toEqual("Author: " + authorEmail); 
    })
});