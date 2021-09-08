const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = new schema({
    group_name: {
        type: String,
        required: [true, 'group name required']
    },
    members: {
        type: Array,
        default: []
    },
    member_count: {
        type: Number,
        default: 0
    },
    message_count: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
});