const React = require("react");
const { shallow } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { Chat } = require("../../../src/client/components/chat.jsx");

const getChat = (props) => {

	return shallow(
		<MemoryRouter>
			<Chat
				{...props} />
		</MemoryRouter>
	);
};


describe("The chat page.", () => {

	it("shows chat-input when user is logged in", () => {

		const wrapper = getChat({ username: "fooie" });
		expect(wrapper.html().includes("id=\"chat\"")).toBe(true);
	});
});