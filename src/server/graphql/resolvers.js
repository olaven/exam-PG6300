/**
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/ad18f9a63c5b62316abaf0644072434e02860d7b/les11/forum/src/server/resolvers.js
 * 
 * As of now, this graphQL API is just going to mirror 
 * the REST-API in ../routes
 */

const { AuthenticationError } = require("apollo-server-express");
const data = require("../database/data");


module.exports = {

	Query: {
		getData: (parent, args, context, info) => {
			if (context.user) return data.getAll();
			return new AuthenticationError("Must log in.");
		},
		getDataById: (parent, args, context, info) => {
			if (context.user) return data.getById(args.id);
			return new AuthenticationError("Must log in.");
		},
		getDataByChecked: (parent, args, context, info) => {
			if (context.user) return data.getByChecked(args.checked);
			return new AuthenticationError("Must log in.");
		}
	},

	Mutation: {
		createData: (parent, args, context, info) => {
			return data.insertData(args.id, args.message, args.checked);
		}
	},

	/*
        When fields in the schema do not match 1-to-1 the fields in our domain models,
        we need to specify how to "resolve" them.
        In our case, types like News, Author and Comment in the schema are objects, ie
        nodes in the GraphQL graph.
        But, in our domain model, those are just ids.
        So, we need to map from id to object.
     */
	/*
        Data: {
            id: (parent, args, context, info) => {
                return data.getById
            },
            message: (parent, args, context, info) => {
                return parent.comments ? parent.comments.length : 0;
            }, 
            checked: (parent, args, context, info) => {

            }
        }
        */
};