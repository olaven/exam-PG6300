/**
 * NOTE: This file is copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/d6fe0c9610de8664e9a36dc7e68cd70e4604b3c7/exercise-solutions/quiz-game/part-10/tests/server/routes/auth-api-test.js
 */

const request = require("supertest");
const { app } = require("../../../src/server/app");


let counter = 0;


test("Test fail login", async () => {

	const response = await request(app)
		.post("/api/login")
		.send({
			email: "foo_@mail.com" + (counter++),
			password: "bar"
		})
		.set("Content-Type", "application/json");

	expect(response.statusCode).toBe(401);
});


test("Test fail access data of non-existent user", async () => {

	const response = await request(app)
		.get("/api/user");

	expect(response.statusCode).toBe(401);
});


test("Test create user, but fail get data", async () => {

	const email = "foo_@something." + (counter++);

	let response = await request(app)
		.post("/api/signup")
		.send({
			email,
			password: "bar"
		})
		.set("Content-Type", "application/json");

	expect(response.statusCode).toBe(201);


	//no use of cookies here, so auth fails
	response = await request(app)
		.get("/api/user");

	expect(response.statusCode).toBe(401);
});

test("Test create user and get data", async () => {

	const email = "foo@test.com" + (counter++);

	//use same cookie jar for the HTTP requests
	const agent = request.agent(app);

	let response = await agent
		.post("/api/signup")
		.send({
			email,
			password: "bar"
		})
		.set("Content-Type", "application/json");

	expect(response.statusCode).toBe(201);


	//using same cookie got from previous HTTP call
	response = await agent.get("/api/user");

	expect(response.statusCode).toBe(200);
	expect(response.body.email).toBe(email);
	expect(response.body.password).toBeUndefined();
});


test("Test create user, login in a different session and get data", async () => {

	const email = "foo_@test.com" + (counter++);

	//create user, but ignore cookie set with the HTTP response
	let response = await request(app)
		.post("/api/signup")
		.send({
			email,
			password: "bar"
		})
		.set("Content-Type", "application/json");
	expect(response.statusCode).toBe(201);


	//use new cookie jar for the HTTP requests
	const agent = request.agent(app);

	//do login, which will get a new cookie
	response = await agent
		.post("/api/login")
		.send({
			email,
			password: "bar"
		})
		.set("Content-Type", "application/json");
	expect(response.statusCode).toBe(204);


	//using same cookie got from previous HTTP call
	response = await agent.get("/api/user");

	expect(response.statusCode).toBe(200);
	expect(response.body.email).toBe(email);
	expect(response.body.password).toBeUndefined();
});



test("Test login after logout", async () => {

	const email = "foo_@someone.com" + (counter++);

	//use same cookie jar for the HTTP requests
	const agent = request.agent(app);

	//create user
	let response = await agent
		.post("/api/signup")
		.send({
			email,
			password: "bar"
		})
		.set("Content-Type", "application/json");
	expect(response.statusCode).toBe(201);


	//can get info
	response = await agent.get("/api/user");
	expect(response.statusCode).toBe(200);


	//now logout
	response = await agent.post("/api/logout");
	expect(response.statusCode).toBe(204);


	//after logout, should fail to get data
	response = await agent.get("/api/user");
	expect(response.statusCode).toBe(401);

	//do login
	response = await agent
		.post("/api/login")
		.send({
			email,
			password: "bar"
		})
		.set("Content-Type", "application/json");
	expect(response.statusCode).toBe(204);


	//after logging in again, can get info
	response = await agent.get("/api/user");
	expect(response.statusCode).toBe(200);
});
