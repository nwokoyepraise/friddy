const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = new schema({
    group_id: {
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
    },
    received_by: {
        type: Array,//[{user_id: user_id, timestamp: timestamp},...]
        default: []
    }, 
    seen_by: {
        type: Array,//[{user_id: user_id, timestamp: timestamp},...]
        default: []
    } 
});