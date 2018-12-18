const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    amount: Number,
    description: String,
    date: Date,
    user: {
        _id: String
    },
    wallet: String,
    category: String
});

transactionSchema.index({name: 1, unique: true});

module.exports = model('transaction', transactionSchema, 'transactions');