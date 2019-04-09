
const { codes } = require("../../../src/shared/http");
const { app } = require("../../../src/server/app");
const request = require("supertest")(app);

describe("The API in general.", () => {

	it("returns 404 Not Found on invalid route", async () => {

		const response = await request
			.get("/api/invalid")
			.send();

		expect(response.statusCode).toEqual(codes.NOT_FOUND);
	});
});