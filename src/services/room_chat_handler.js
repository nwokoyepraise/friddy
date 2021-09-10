require('dotenv').config();
const room_chat_model = require('../models/room_chat_model');
const jwt = require('jsonwebtoken');
const token_handle = require('../utils/token_handle');
const key = process.env.JWTKEY;

module.exports.auth_conn = async function (auth_header) {
    try {
        let auth = token_handle.get_auth(auth_header);
        var res0 = await jwt.verify(auth, key);
        return (res0.sub);
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports.save_chat_to_db = async function (chat, user_id, timestamp) {
    try {
        let data = await room_chat_model.save_chat_to_db(chat, user_id, timestamp)
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}