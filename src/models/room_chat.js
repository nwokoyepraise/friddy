const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;

const room_chat = new schema({
    room_id: {
        type: String,
        required: [true, 'group_id required']
    },
    sender: {
        type: String,
        required: [true, 'sender_id required']
    },
    category: {
        type: Map, //{type: 0||1 (0 = reply or 1 = not reply), message_id: message_id}
        required: [true, 'definition required']
    },
    message_string: {
        type: String
    },
    message_media: {
        type: Map,//{type: 'video||image', }
        default: null
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongo_conn.model('room_chat', room_chat, 'room_chat');