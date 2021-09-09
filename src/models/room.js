const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;


const room = new schema({
    room_name: {
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

module.exports = mongo_conn.model('rooms', room, 'rooms');