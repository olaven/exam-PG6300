const data = [
    {
        "id": 1,
        "message": "some message",
        "checked": false
    },
    {
        "id": 2,
        "message": "this message is amazing",
        "checked": true
    },
    {
        "id": 3,
        "message": "this message is quite cool",
        "checked": true
    },
    {
        "id": 4,
        "message": "what a happy message!",
        "checked": false
    },
    {
        "id": 5,
        "message": "coffecoding",
        "checked": true
    }
];

const getAll = () => 
    data

const getById = async (id) => 
    data.filter(item => item.id === id)[0];

const getByChecked = async (checked) => 
    data.filter(item => item.checked === checked)

const insertData = async (item) => {

    const exists = await getById(item.id); 
    if (exists) {
        return false; 
    }

    data.push(item);
    return true; 
}

module.exports = {
    getAll,
    getById, 
    getByChecked,
    insertData
}


