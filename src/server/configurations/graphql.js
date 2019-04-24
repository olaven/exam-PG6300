const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

const configureGraphQL = (app) => {

	// // configuring graphql
	// const apollo = new ApolloServer({
	// 	typeDefs,
	// 	resolvers,
	// 	context: ({ req }) => ({
	// 		// allows for authorization in resolvers
	// 		user: req.user
	// 	}),
	// });
	// apollo.applyMiddleware({
	// 	app,
	// 	path: "/graphql"
	// });
};

module.exports = {
	configureGraphQL
};