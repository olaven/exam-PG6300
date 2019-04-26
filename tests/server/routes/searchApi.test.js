const request = require("supertest");

const { getLoggedInAgentAs } = require("../../mytest-utils"); 
const { getDevUser } = require("../../../src/server/database/demo");
const { app } = require("../../../src/server/app");


describe("The search-api.", () => {

    it("401 if not authenticated", async () => {

        const response = await request(app)
            .get("/api/search/" + getDevUser().givenName)
            .send();

        expect(response.statusCode).toEqual(401);
    });

    it("Returns 400 if bad searchquery is provided", async () => {

        const agent = await getLoggedInAgentAs(getDevUser()); 
        const response = await agent
            .get("/api/search/" + undefined)
            .send();
        
            expect(response.statusCode).toBe(400); 
    })

    it("Returns reasonable results", async () => {

        const user = getDevUser(); 
        const agent = await getLoggedInAgentAs(user); 
        const response = await agent
            .get("/api/search/" + user.givenName)
            .send();

        expect(response.statusCode).toBe(200);
        response.body.results.find(u => u.email = user.email);  
    });

    it("Does not contain location or dateOfBirth", async () => {

        const user = getDevUser();
        const agent = await getLoggedInAgentAs(user);
        const response = await agent
            .get("/api/search/" + user.givenName)
            .send();

        expect(response.statusCode).toBe(200);
        response.body.results.forEach(u => {
            expect(u.location).toBeUndefined(); 
            expect(u.dateOfBirth).toBeUndefined();
        })
    });
});