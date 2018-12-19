const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    amount: Number,
    description: String,
    date: Date,
    user: Schema.ObjectId,
    wallet: Schema.ObjectId,
    category: {} //{type: income|expence, name: String}
});

transactionSchema.index({name: 1, unique: true});

module.exports = model('transaction', transactionSchema, 'transactions');