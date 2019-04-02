const data = [
	{
		id: 1,
		message: "some message",
		checked: false
	},
	{
		id: 2,
		message: "this message is amazing",
		checked: true
	},
	{
		i: 3,
		messag: "this message is quite cool",
		checked: true
	},
	{
		id: 4,
		message: "what a happy message!",
		checked: false
	},
	{
		id: 5,
		message: "coffecoding",
		checked: true
	}
];

const getAll = () => 
	data;

const getById = (id) => 
	data.find(item => item.id === id);
    

const getByChecked = (checked) => 
	data.filter(item => item.checked === checked);
    

const insertData = (item) => {

	const exists = getById(item.id); 
	if (exists) {
		return false; 
	}

	data.push(item);
	return true; 
};

module.exports = {
	getAll,
	getById, 
	getByChecked,
	insertData
};


