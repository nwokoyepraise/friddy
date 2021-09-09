const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;

const session = new schema({
    user_id: {
        type: String,
        required: [true, 'user_id required'],
        unique: true,
    },
    session_log: [{
        time_start: {type: Date, default: new Date()},
        time_end: {type: Date, default: null}
    }]
});

module.exports = mongo_conn.model('session_log', session, 'session_log');