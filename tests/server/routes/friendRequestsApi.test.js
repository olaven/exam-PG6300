
const { getDevUser } = require("../../../src/server/database/demo");
const friendRequests = require("../../../src/server/database/friendRequests"); 
const users = require("../../../src/server/database/users"); 
const { app } = require("../../../src/server/app");
const request = require("supertest");


const getLoggedInAgentAs = async user => {

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

const postFriendRequestResponse = async (from, to, agent) => await agent
    .post("/api/friendRequests")
    .send({ from, to });



describe("Friend request API.", () => {

    beforeEach(() => {

        friendRequests.clear(); 
    })

    it("401 if not authenticated", async () => {

        const response = await postFriendRequestResponse("dev@admin.com", "pippin@shire.com", request(app)); 

        expect(response.statusCode).toEqual(401);
    }); 

	it("400 on bad request", async () => {

		const agent = await getLoggedInAgentAs(getDevUser()); 
        
        const friendRequestResponse = await agent
            .post("/api/friendRequests")
            .send(); 
        
        expect(friendRequestResponse.statusCode).toBe(400); 
    });
    
    it("204 on good request", async () => {

        const agent = await getLoggedInAgentAs(getDevUser());
        const friendRequestResponse = await postFriendRequestResponse("dev@admin.com", "pippin@shire.com", agent); 
        expect(friendRequestResponse.statusCode).toBe(201);
    });

    it("409 if request already exists", async () => {

        const agent = await getLoggedInAgentAs(getDevUser()); 

        const firstResponse = await postFriendRequestResponse("dev@admin.com", "pippin@shire.com", agent); 
        expect(firstResponse.statusCode).toBe(201); 

        const secondResponse = await postFriendRequestResponse("dev@admin.com", "pippin@shire.com", agent);
        expect(secondResponse.statusCode).toBe(409); 
    }); 

    it("gives request to logged in user", async () => {

        const samAgent = await getLoggedInAgentAs({
            email: "sam@shire.com", 
            password: "rosie"
        }); 

        await postFriendRequestResponse("sam@shire.com", "gandalf@arda.com", samAgent); 
        
        const gandalfAgent = await getLoggedInAgentAs({
            email: "gandalf@arda.com", 
            password: "runrunrun"
        }); 

        const response = await gandalfAgent
            .get("/api/friendRequests")
            .query({ to: "gandalf@arda.com"})
            .send(); 

        expect(response.statusCode).toBe(200); 
        expect(response.body.length).toBe(1); 
    }); 

    it("returns requests with IDs", async () => {

        const samAgent = await getLoggedInAgentAs({
            email: "sam@shire.com",
            password: "rosie"
        });

        await postFriendRequestResponse("sam@shire.com", "gandalf@arda.com", samAgent);

        const gandalfAgent = await getLoggedInAgentAs({
            email: "gandalf@arda.com",
            password: "runrunrun"
        });

        const response = await gandalfAgent
            .get("/api/friendRequests")
            .query({
                to: "gandalf@arda.com"
            })
            .send();

        const id = response.body[0].id; 
        expect(id).toBeDefined(); 
    }); 

    it("accepting-endpoint returns 401 if not authenticated", async () => {

        
        const response = await request(app)
            .delete("/api/friendRequests/someId")
            .send(); 

        expect(response.statusCode).toBe(401); 
    }); 

    it("returns 400 if x-request-accepted is not specified ", async () => {


        const agent = await getLoggedInAgentAs(getDevUser()); 
        const response = await agent
            .delete("/api/friendRequests/someId")
            .send(); 

        expect(response.statusCode).toBe(400);
    });

    it("returns 404 NOT FOUND if id is invalid", async () => {


        const agent = await getLoggedInAgentAs(getDevUser());
        const response = await agent
            .delete("/api/friendRequests/INVALID")
            .set("x-request-accepted", true)
            .send();

        expect(response.statusCode).toBe(404);
    });

    it("Adds friends if x-request-accepted is true", async () => {

        let sam = users.getUser("sam@shire.com");
        let gandalf = users.getUser("gandalf@arda.com");
        
        expect(sam.friendEmails.includes(gandalf.email)).toBe(false);
        expect(gandalf.friendEmails.includes(sam.email)).toBe(false);

        const id = friendRequests.persist("sam@shire.com", "gandalf@arda.com"); 
        const agent = await getLoggedInAgentAs(getDevUser());
        const response = await agent
            .delete("/api/friendRequests/" + id)
            .set("x-request-accepted", true)
            .send();

        expect(response.statusCode).toBe(204);
        

        sam = users.getUser(sam.email); 
        gandalf = users.getUser(gandalf.email)

        expect(sam.friendEmails.includes(gandalf.email)).toBe(true); 
        expect(gandalf.friendEmails.includes(sam.email)).toBe(true);
    });
});