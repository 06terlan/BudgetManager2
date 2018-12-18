const { Schema, model } = require('mongoose');

const wallerSchema = new Schema({
	id: number,
	name: String,
	owner: {
		email: String,
		firstname: String,
		lastname: String,
	},
	balance: 0.00
});

wallerSchema.index({id: 1, unique: true});

module.exports = model('wallet', wallerSchema, 'wallets');
