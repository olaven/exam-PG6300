
const { getDevUser } = require("../../../src/server/database/demo");; 
const { app } = require("../../../src/server/app");
const request = require("supertest");

describe("The API in general.", () => {

    it("401 if not authenticated", async () => {

        const response = await request(app)
            .post("/api/token")
            .send();

        expect(response.statusCode).toEqual(401);
    }); 

	it("returns a token when authenticated", async () => {

        const devUser = getDevUser(); 
		const agent = await request.agent(app);
		let loginResponse = await agent
		    .post("/api/login")
		    .send({
		        email: devUser.email,
		        password: devUser.password
		    })
		    .set("Content-Type", "application/json");

        expect(loginResponse.statusCode).toBe(204);
        
        const tokenResponse = await agent
            .post("/api/token")
            .send(); 
        
        expect(tokenResponse.statusCode).toBe(201); 
        expect(tokenResponse.body.token).toBeDefined();
	});
});