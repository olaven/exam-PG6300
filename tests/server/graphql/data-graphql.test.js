const request = require("supertest");
const { app } = require("../../../src/server/app");

let agent = undefined;
let counter = 0;


const sendQuery = async (query) => {

	let response = await agent
		.post("/graphql")
		.send({query});

	return response.body.data;
};

const getBodyFromNewCookieJar = async (query) => {

	let response = await request(app)
		.post("/graphql")
		.send({query});

	return response.body;
};


describe("The graphql api.", () => {

	/**
	 * Most tests require the client to be logged in. 
	 * Therefore, an agent is logged in before each test. 
	 */
	beforeEach(async () => {

		agent = await request.agent(app);
		let response = await agent
			.post("/api/signup")
			.send({
				username: ("foo_" + counter++),
				password: "bar"
			})
			.set("Content-Type", "application/json");

		expect(response.statusCode).toBe(201);
	});

	it("returns data.", async () => {

		const data = await sendQuery(`{
                getData {
                    id,
                    message, 
                    checked
                }
            }`);
        
		expect(data.getData.length).toBeGreaterThan(0);
	});

	it("returns id and message only", async () => {

		const data = await sendQuery(`{
            getData {
                id,
                message
            }
        }`);
        
		for(let element of data.getData) {

			expect(element.id).toBeDefined();
			expect(element.message).toBeDefined();
			expect(element.checked).toBeUndefined(); 
		}
	});

	it("returns message and checked only", async () => {

		const data = await sendQuery(`{
            getData {
                message, 
                checked
            }
        }`);

		for (let element of data.getData) {

			expect(element.id).toBeUndefined();
			expect(element.message).toBeDefined();
			expect(element.checked).toBeDefined();
		}
	});

	it("returns data by id", async () => {
        
		const id = 1;
		const data = await sendQuery(`{
            getDataById(id: ${id}) {
                id,
                message, 
                checked
            }
        }`);

		const retrieved = data.getDataById.id;
		expect(retrieved).toEqual(id);
	});

	it("Returns correct message when user is not logged in", async () => {

		const data = await getBodyFromNewCookieJar(`{
            getData {
                id,
                message, 
                checked
            }
        }`);

		const message = data.errors[0].message;
		expect(data.errors).toBeDefined();
		expect(message).toBe("Must log in.");
	});
});

