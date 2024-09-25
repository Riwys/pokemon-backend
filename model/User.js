const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    entries: {
        type: Number,
        default: 0
    },
    joined: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', userSchema)