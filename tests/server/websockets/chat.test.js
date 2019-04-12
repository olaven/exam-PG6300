/**
 * NOTE: This file is partially copied from: 
 * * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/server/ws-handler-test.js
 */

const { app } = require("../../../src/server/app");
const WS = require("ws");

const { asyncCheckCondition, checkConnectedWS } = require("../../mytest-utils");

let server;
let port;

const getSocket = () => 
	new WS("ws://localhost:" + port);


describe("The websocket-setup for chat", () => {

	beforeAll(done => {

		server = app.listen(0, () => {

			port = server.address().port;
			done();
		});
	});

	afterAll(() => {

		server.close();
	});
    
	const sockets = [];


	afterEach(() => {
		/*
            make sure to manually free the sockets, otherwise might block Jest and the
            shutting down of Express...
        */
		for (let i = 0; i < sockets.length; i++) {
            
			sockets[i].close();
		}
		sockets.length = 0;
	});

	it("updates count when a user connects", async () => {

		//register a client using WS
		const first = getSocket();
		sockets.push(first);

		let a = 0;
		first.on("message", data => {
			a = JSON.parse(data).userCount;
		});


		let connected = await checkConnectedWS(first, 2000);
		expect(connected).toBe(true);
        
		let updated = await asyncCheckCondition(() => {
			return a === 1;
		}, 2000, 200);
		expect(updated).toEqual(true);
	});
    
	it("updates every connected socket", async () => {
	
		const n = 3;
		const counts = new Array(n);


		for(let i = 0; i < n; i++) {

			//register a client using WS
			const socket = getSocket();
			sockets.push(socket);

			let updated = false;
			socket.on("message", data => {
				counts[i] = JSON.parse(data).userCount;
				updated = true; 
			});

			let connected = await checkConnectedWS(socket, 2000);
			expect(connected).toBe(true);

			await asyncCheckCondition(() => updated, 2000, 200);
			expect(updated).toEqual(true);	
		}
        
		for (let count of counts) {
			expect(count).toBe(n);
		}
	});
    
	it("decrements userCount on disconnect", async () => {

		expect(true).toBe(false);
	});
});
