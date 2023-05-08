const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    date: {
        type: String,
        default: Date()
    },
});
const Users = mongoose.model('user', userSchema, 'user');
module.exports = Users;