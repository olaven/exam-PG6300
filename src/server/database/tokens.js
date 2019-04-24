const nanoid = require("nanoid"); 

const tokens = new Map(); 

const createTokenFor = email => {
    
    const token = nanoid(); 
    tokens.set(email, token); 
    return token; 
}

const removeTokenFor = email => {

    tokens.set(email, null); 
}

module.exports = {
    createTokenFor, 
    removeTokenFor
}