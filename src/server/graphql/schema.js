// /**
//  * NOTE: This file is partially copied from:
//  * https://github.com/arcuri82/web_development_and_api_design/blob/ad18f9a63c5b62316abaf0644072434e02860d7b/les11/forum/src/server/schema.js
//  */

// const { gql } = require("apollo-server-express");


// /*
//     gql`...` is a tagged template literal, where we define the schema as
//     multi-line string. This string is validated for syntactic correctness.

//     Note that the types are "nullable" by default.
//     To specify that a value MUST be present, you need to use a "!".
//  */

// const typeDefs = gql `
    

//     type Query{
        
//         authenticationError: String
        
//         #Get all the news
//         getData: [Data]
        
//         #Get a single data entry, specified by id
//         getDataById(id: Int!) : Data

//         #Get data entry by wether they are checked or not 
//         getDataByChecked(checked: Boolean!): [Data]
//     }

//     type Mutation {
//         createData(id: Int!, message: String!, checked: Boolean!): String
//     }


//     type Data {
//         id: Int
//         message: String
//         checked: Boolean
//     }
// `;

// module.exports = typeDefs;