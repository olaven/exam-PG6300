const { ApolloServer } = require("apollo-server-express");
const resolvers = require("../graphql/resolvers");
const typeDefs = require("../graphql/schema");

const configureGraphQL = (app) => {

	// configuring graphql
	const apollo = new ApolloServer({
		typeDefs,
		resolvers
	});
	apollo.applyMiddleware({
		app,
		path: "/graphql"
	});
};

module.exports = {
	configureGraphQL
};