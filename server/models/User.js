const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    zipcode: {
        type: Number,
        required: true,
        default: 0,
    },
});

const User = model('User', userSchema);

module.exports = User;