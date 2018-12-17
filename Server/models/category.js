const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: String,
    children: [
        {
            name: String,
            type: String,
            icon: String,
        }
    ],
    owner: {
        email: String,
        firsname: String,
        lastname: String,
    },
    type: String,
    icon: String
});

categorySchema.index({name: 1, unique: true});

module.exports = model('category', categorySchema, 'categories');