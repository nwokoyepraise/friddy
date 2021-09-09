const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;

const interaction = new schema({
    user_id: {
        type: String,
        required: [true, 'user_id required'],
        unique: true,
    },
    interaction_log: [{
        action: {type: String, required: [true, 'action required']},
        room_id: {type: mongoose.Schema.Types.ObjectId, required: [true, 'room_id required']},
        timestamp: {type: Date, default: new Date()}
    }]
});
module.exports = mongo_conn.model('interaction_log', interaction, 'interaction_log');