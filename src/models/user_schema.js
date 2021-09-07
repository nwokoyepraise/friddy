const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = new schema({
    user_id: {
        type: String,
        required: [true, 'user_id required']
    },
    username: {
        type: String,
        required: [true, 'username required']
    },
    email: {
        type: String,
        required: [true, 'email required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    timestamp: {
        type: Date,
        default: new Date
    }
});