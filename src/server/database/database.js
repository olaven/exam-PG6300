const path = require("path"); 
const loadJsonFile = require("load-json-file"); 
const writeJsonFile = require("write-json-file"); 

const pathToJson = path.resolve(__dirname, "data.json"); 

const getAll = async () => {

    const all = await loadJsonFile(pathToJson);
    return all; 
}

const getById = async (id) => {
    
    const all = await getAll(); 
    const item = all.filter(item => item.id === id)[0]; 
    
    return item; 
}

const getByChecked = async (checked) => {

    const all = await getAll();
    const filtered = all.filter(item => item.checked === checked); 
    
    return filtered; 
}

const insertData = async (data) => {

    const exists = await getById(data.id); 
    if (exists) {
        return false; 
    }

    writeJsonFile(data, pathToJson); 
    return true; 
}

module.exports = {
    getAll: getAll, 
    getById: getById, 
    getByChecked: getByChecked, 
    insertData: insertData
}