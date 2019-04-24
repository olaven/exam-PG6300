const request = require("supertest");
const { app } = require("../../../src/server/app");
const { getDevUser } = require("../../../src/server/database/demo"); 

let agent = undefined;
const devUser = getDevUser();
/**
 * Most tests require the client to be logged in. 
 * Therefore, an agent is logged in before each test. 
 */
beforeEach(async () => {

    agent = await request.agent(app); 
    let response = await agent
        .post("/api/login")
        .send({
            email: devUser.email,
            password: devUser.password
        })
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(204);
});


describe("the post REST-API.", () => {

    it("returns 401 if not authenticated", async () => {

        const response = await request(app)
            .get("/api/posts")
            .send(); 

        expect(response.statusCode).toEqual(401); 
    }); 

    it("gets 200 when logged in", async () => {

    
        const response = await agent
            .get("/api/posts")
            .send(); 

        expect(response.statusCode).toBe(200); 
    }); 

    it("returns several posts", async () => {

        const response = await agent
            .get("/api/posts")
            .send();

        const posts = response.body; 
        expect(posts.length).toBeGreaterThan(2); //Assuming demo data
    })

    it("user only gets posts from friends and him/herself", async () => {

        /*
        NOTE: I am assuming demo data. 
        agent is logged in as dev@admin.com. 
        That account is friends with frodo@shire.com and gandalf@shire.com
        */        
        const response = await agent
            .get("/api/posts")
            .send() 

        const friends = devUser.friendEmails; 
        const posts = response.body
        posts.forEach(post => {
            expect(friends.includes(post.authorEmail)).toBe(true); 
        })
    });
});
