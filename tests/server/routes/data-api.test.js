const request = require("supertest");
const { app } = require("../../../src/server/app");

let agent = undefined; 
let counter = 0; 

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


describe("the data REST-API.", () => {

	it("returns data.", async () => {

		const response = await agent
			.get("/api/data");

		expect(response.statusCode).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
	});

	it("returns by id", async () => {

		const response = await agent
			.get("/api/data/1")
			.send();

		const data = response.body;

		expect(response.statusCode).toBe(200);
		expect(data.id).toBe(1); 
	});

	it("returns 404 on resource not found", async () => {

		const response = await agent
			.get("/api/data/99999")
			.send();
            

		expect(response.statusCode).toBe(404);
	});

	it("returns 400 when id is not a valid number", async () => {

		const response = await agent
			.get("/api/data/notNum")
			.send();

		expect(response.statusCode).toEqual(400);
	});

	it("returns filtered by checked is true ", async () => {

		const response = await agent
			.get("/api/data")
			.query({checked: true})
			.send();

		expect(response.statusCode).toEqual(200);
		const data = response.body;
		data.forEach(element => {
			expect(element.checked).toBe(true);
		});
	});

	it("returns filtered by checked is false ", async () => {

		const response = await agent
			.get("/api/data")
			.query({checked: false})
			.send();

		expect(response.statusCode).toEqual(200);
		const data = response.body;
		data.forEach(element => {
			expect(element.checked).toBe(false);
		});
	});

	it("returns 400 on invalid checked query", async () => {

		const response = await agent
			.get("/api/data")
			.query({checked: "invalid"})
			.send();

		expect(response.statusCode).toEqual(400);
	});

	it("returns 403 if the user is logged out on all routes", async () => {

		const response = await request(app)
			.get("/api/data");

		expect(response.statusCode).toBe(403);
	});    
});
