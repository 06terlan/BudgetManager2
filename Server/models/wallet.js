const { Schema, model } = require('mongoose');

const wallerSchema = new Schema({
	id: number,
	name: String,
	user_id: String,
	balance: String
});

wallerSchema.index({id: 1, unique: true});

module.exports = model('wallet',wallerSchema, 'wallets');