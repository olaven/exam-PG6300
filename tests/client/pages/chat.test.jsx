const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { Chat } = require("../../../src/client/pages/chat.jsx");
const { overrideWebSocket, asyncCheckCondition } = require("../../mytest-utils");

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

describe("The chat page.", () => {

	beforeAll(() => {

		overrideWebSocket();
	});

	it("renders some content.", () => {

		const wrapper = getChat({ username: "Fooie"});
		const chat = wrapper.find("#chat").get(0);

		expect(chat).not.toBeUndefined();
	});

	it("is not avaialble when not logged in", () => {

		const wrapper = getChat({ username: null});
        
		expect(wrapper.html().includes("chat")).toBe(false);
	});

	it("shows chat-input when user is logged in", () => {

		const wrapper = getChat({ username: "Fooie" });
		const chat = wrapper.find("#chat-input").get(0);

		expect(chat).not.toBeUndefined();
	});

	it("shows sent message", () => {

		const message = "This is an important message!";
		const wrapper = getChat({ username: "Fooie" });
        
		sendMessage(wrapper, message);
        
		asyncCheckCondition(() => {
			wrapper.update();
			return wrapper.html().includes(message).toBe(true);
		}, 2000, 100);

		expect(wrapper.html().includes(message)).toBe(true);
	});
});