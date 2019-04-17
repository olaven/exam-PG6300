const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { app } = require("../../../src/server/app");
const { Chat } = require("../../../src/client/pages/chat.jsx");
const { asyncCheckCondition, overrideWebSocket, overrideFetch } = require("../../mytest-utils");

const getChat = (props) => {

	return mount(
		<MemoryRouter>
			<Chat
				{...props} />
		</MemoryRouter>
	);
};

const sendMessage = (wrapper, message) => {
    
	const input = wrapper.find("#chat-input").at(0);
	const button = wrapper.find("#chat-button").at(0);
	
	input.simulate("change", { target: { value: message } });

	button.simulate("click");
};

let server; 
let port; 

describe("The chat page.", () => {

	beforeAll((done) => {

		server = app.listen(0, () => {
			port = server.address().port;
			done();
		});


		overrideFetch(app);
		overrideWebSocket();
	});

	afterAll(() => {
		server.close(); 
	});

	it("renders some content.", () => {

		const wrapper = getChat({ username: "Fooie"});
		const chat = wrapper.find("#chat").get(0);

		expect(chat).not.toBeUndefined();
	});

	it("is not avaialble when not logged in", () => {

		const wrapper = getChat({ username: null});
		expect(wrapper.html().includes("id=\"chat\"")).toBe(false);
	});

	it("shows chat-input when user is logged in", () => {

		const wrapper = getChat({ username: "fooie" });
		expect(wrapper.html().includes("id=\"chat\"")).toBe(true);
	});

	it("shows sent message", async () => {

		const message = "This is an important message!";
		const wrapper = getChat({username: "fooie"});
        
		sendMessage(wrapper, message);
        
		asyncCheckCondition(() => {
			wrapper.update();
			console.log("wrapper updated: ", wrapper.html());
			return wrapper.html().includes(message).toBe(true);
		}, 4000, 100);

		expect(wrapper.html().includes(message)).toBe(true);
	});
});