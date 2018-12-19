const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	email: String,
	password: String,
	firstname: String,
	lastname: String,
	wallets: [
		{
            name: String,
			balance: Number
		}
	],
    categories: []
});

userSchema.index({email: 1, unique: true});

module.exports = model('user', userSchema, 'users');