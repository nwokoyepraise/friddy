const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;

const room_chat = new schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'room_id required']
    },
    sender: {
        type: String,
        required: [true, 'sender_id required']
    },
    message_string: {
        type: String,
        required: [true, 'message_string required']
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongo_conn.model('room_chat', room_chat, 'room_chat');