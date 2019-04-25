const {
    getDevUser
} = require("../../../src/server/database/demo");
const friendRequests = require("../../../src/server/database/friendRequests");
const users = require("../../../src/server/database/users");
const {
    app
} = require("../../../src/server/app");
const request = require("supertest");


const getLoggedInAgentAs = async (user) => {

    const agent = await request.agent(app);
    let loginResponse = await agent
        .post("/api/login")
        .send({
            email: user.email,
            password: user.password
        })
        .set("Content-Type", "application/json");
    return agent;
}

describe("the users-API.", () => {

    it("accepting-endpoint returns 401 if not authenticated", async () => {

        const response = await request(app)
            .get("/api/users")
            .send();

        expect(response.statusCode).toBe(401);
    });

    it("returns friends only", async () => {

        const devUser = getDevUser();
        const agent = await getLoggedInAgentAs(devUser);
        
        const response = await agent
            .get("/api/users")
            .send()

        expect(response.statusCode).toBe(200); 
        response.body.forEach(user => {
            expect(devUser.friendEmails.includes(user.email)).toBe(true); 
        })
    });

    it("returns by email", async () => {

        //NOTE: THis test assumes demo data has "sam@shire.com" as friend of DevUser
        const friendMail = "sam@shire.com";
        const agent = await getLoggedInAgentAs(getDevUser());
        const response = await agent.get("/api/users/" + friendMail);

        expect(response.statusCode).toBe(200);
        expect(response.body.email).toEqual(friendMail);
    });

    it("returns 403 if not friends, by email", async () => {

        //NOTE: THis test assumes demo data does NOT have "frodo@shire.com" as friend of DevUser
        const friendMail = "frodo@shire.com"; 
        const agent = await getLoggedInAgentAs(getDevUser()); 
        const response =  await agent.get("/api/users/" + friendMail); 

        expect(response.statusCode).toBe(403); 
    });

    it("returns 404 if email not registered", async () => {

        const friendMail = "UNREGISTERED@mail.com";
        const agent = await getLoggedInAgentAs(getDevUser());
        const response = await agent.get("/api/users/" + friendMail);

        expect(response.statusCode).toBe(404);
    });
});