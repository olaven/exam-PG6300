const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom"); 

const { app } = require("../../../src/server/app"); 
const { getTestUser } = require("../clientTestUtils"); 
const { overrideWebSocket } = require("../../mytest-utils"); 
const { Home } = require("../../../src/client/pages/home.jsx");

const getHome = (props) => {
	
	const routerWrapper = shallow(
		<MemoryRouter>
			<Home
				{...props} />
		</MemoryRouter>
	);

	return routerWrapper.find(Home); 
}; 

let server;
let port; 

describe("the home page.", () => {


	beforeAll(async (done) => {
		server = await app.listen(0); 
		port = server.address().port; 
		overrideWebSocket(port); 
		done();
	});

	afterAll(async (done) => {
		server.close();
		done();
	}); 


	it("renders some content.", () => {

		const wrapper = getHome(null); 
		const home = wrapper.find("#home");

		expect(home).not.toBeNull();
	});

	it("renders message to login when user logged out", () => {

		const wrapper = getHome({
			user: null 
		}); 
		const loginLink = wrapper.find(".toLogIn").at(0); 
        
		expect(loginLink).toBeDefined(); 
	});

	it("renders links user logged in", () => {

		const wrapper = shallow(<MemoryRouter>
			<Home
				user={getTestUser()} />
		</MemoryRouter>) 
		
		const linkToConversations = wrapper.find("#linkToConversations").at(0);
		const profileLink = wrapper.find("#linkToProfile").at(0);  
		const friendsLink = wrapper.find("#linkToFriends").at(0);  

		expect(linkToConversations).toBeDefined(); 
		expect(profileLink).toBeDefined(); 
		expect(friendsLink).toBeDefined(); 
	});
});