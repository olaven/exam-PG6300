/**
 * NOTE: This file is partially copied from: 
 * * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/server/ws-handler-test.js
 */

const { app } = require("../../../src/server/app");
const WS = require("ws");

const { asyncCheckCondition, checkConnectedWS, overrideWebSocket } = require("../../mytest-utils");

let server;
let port;
const sockets = [];


const connectSocket = async (onMessage, updatedPredicate) => {

	const socket = new WS("ws://localhost:" + port + "/usercount");
	
	sockets.push(socket);
	socket.on("message", onMessage);

	const connected = await checkConnectedWS(socket, 2000);
	expect(connected).toBe(true);

	const updated = await asyncCheckCondition(() => 
		updatedPredicate, 2000, 200);
	expect(updated).toEqual(true);

	return socket; 
};

describe("Websocket for usercount.", () => {


	beforeAll(done => {

		server = app.listen(0, () => {

			port = server.address().port;
			overrideWebSocket(port); 
			done();
		});
	});

	afterAll(async () => {

		await server.close();
	});


	afterEach(async () => {
		/*
            make sure to manually free the sockets, otherwise might block Jest and the
            shutting down of Express...
        */
		for (let i = 0; i < sockets.length; i++) {

			await sockets[i].close();
		}
		sockets.length = 0;
	});

	it("updates count when a user connects", async () => {

		let updated = false; 
		let count; 
		await connectSocket(
			data => {
				updated = true; 
				count = JSON.parse(data).userCount;
			}, 
			() => {
				return updated;
			}
		);

		expect(count).toEqual(1);
	});
    
	it("updates every connected socket", async () => {
	
		const n = 3;
		const counts = new Array(n);


		for(let i = 0; i < n; i++) {

			let updated = false; 
			await connectSocket(
				data => {
					updated = true;
					counts[i] = JSON.parse(data).userCount;
				},
				() => updated
			);
		}
		
		await asyncCheckCondition(() => false, 2000, 1000);
		
		for (let count of counts) {
			expect(count).toBe(n);
		}
	});
    
	it("decrements userCount on disconnect", async () => {

		let recordedCount;

		const initial = 5; 
		for(let i = 0; i < initial; i++) {
			
			let updated = false;
			await connectSocket(
				data => {
					recordedCount = JSON.parse(data).userCount;
					updated = true;
				},
				() => updated
			);
		}

		const decrement = 2; 
		for (let i = 0; i < decrement; i++) {
			sockets[i].close();
		}

		await asyncCheckCondition(() => false, 1000, 100);
		expect(recordedCount).toEqual(initial - decrement);
	});
});
