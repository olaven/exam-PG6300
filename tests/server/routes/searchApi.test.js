const request = require("supertest");

const { getLogge} = require("../../mytest-utils"); 
const { getDevUser } = require("../../../src/server/database/demo");;
const { app } = require("../../../src/server/app");

const devUser = getDevUser(); 


const getLoggedInAgent = async () => {

    const devUser = getDevUser();
    const agent = await request.agent(app);
    let loginResponse = await agent
        .post("/api/login")
        .send({
            email: devUser.email,
            password: devUser.password
        })
        .set("Content-Type", "application/json");
    return agent; 
}

describe("The search-api.", () => {

    it("401 if not authenticated", async () => {

        const response = await request(app)
            .get("/api/search/" + devUser.givenName)
            .send();

        expect(response.statusCode).toEqual(401);
    });

    it("Returns 400 if bad searchquery is provided", async () => {

        const agent = await getLoggedInAgent(); 
        const response = await agent
            .get("/api/search/" + undefined)
            .send();
        
            expect(response.statusCode).toBe(400); 
    })

    it("Returns reasonable results", async () => {

        const agent = await getLoggedInAgent(); 
        const response = await agent
            .get("/api/search/" + devUser.givenName)
            .send();

        expect(response.statusCode).toBe(200);
        response.body.results.find(user => user.email = devUser.email);  
    });

    it("Does not contain location or dateOfBirth", async () => {

        const agent = await getLoggedInAgent();
        const response = await agent
            .get("/api/search/" + devUser.givenName)
            .send();

        expect(response.statusCode).toBe(200);
        response.body.results.forEach(user => {
            expect(user.location).toBeUndefined(); 
            expect(user.dateOfBirth).toBeUndefined();
        })
    });
});