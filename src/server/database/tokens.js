/**
 * NOTE: This file is inspired by
 * https://github.com/arcuri82/web_development_and_api_design/blob/b83bafcbb7b4a5594b69f50cba09b525598d5df0/les10/connect4-v2/src/server/ws/tokens.js
 */

const nanoid = require("nanoid"); 

const tokens = new Map(); 

const createTokenFor = email => {
    
    const token = nanoid(); 
    tokens.set(token, email); 
    return token; 
}

const consumeToken = token => {

    const email = tokens.get(token); 
    tokens.delete(token)
    return email; 
}

module.exports = {
    createTokenFor, 
    consumeToken
}