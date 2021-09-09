const room_chat_model = require('../models/room_chat_model')

module.exports.save_chat_to_db = async function (chat, user_id) {
    try {
        let data = await room_chat_model.save_chat_to_db(chat, user_id)
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}