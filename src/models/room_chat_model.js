const room_chat = require('./room_chat');

module.exports.save_chat_to_db = async function (chat, user_id) {
    try {
        return await room_chat.create({room_id: chat.room_id, sender: user_id, message_string: chat.message_string});
    } catch (error) {
        console.log(error);
    }
}