
const { codes } = require("../../../src/shared/http");
const { app } = require("../../../src/server/app");
const request = require("supertest");

describe("The API in general.", () => {

	it("returns 404 Not Found on invalid route", async () => {

		const response = await request(app)
			.get("/api/invalid")
			.send();

		response;
		expect(response.statusCode).toEqual(codes.NOT_FOUND);
	});
});