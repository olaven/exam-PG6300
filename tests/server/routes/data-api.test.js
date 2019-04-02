const request = require('supertest');
const { app } = require("../../../src/server/app");

let counter = 0;

describe("the data REST-API.", () => {

    it("returns data.", async () => {

        const response = await request(app)
            .get("/api/data")
            .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("returns by id", async () => {

        const response = await request(app)
            .get("/api/data/1")
            .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(200);
        const data = response.body;
        expect(data.id).toBe(2); 
    });

    it("returns 404 on resource not found", async () => {

        const response = await request(app)
            .get("/api/data/99999")
            .set('Content-Type', 'application/json')

        expect(response.statusCode).toBe(404);
    });
});
