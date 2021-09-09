const room_chat_handler = require('../services/room_chat_handler');
const session_handler = require('../services/session_handler');

module.exports = function (room_chat_nsp) {
    try {
        room_chat_nsp.on('connection', async (socket) => {
            let user_id = socket.request.user.user_id;
            let time_start = new Date();
    
            await session_handler.log_start(user_id, time_start);
            //console.log(`socket ${socket.id} just got connected!`);

            socket.on('join_room', async function (room_id) {
                socket.join(room_id);
                //console.log(`socket ${socket.id} joined room ${room_id}!`)
            });

            socket.on('message', async function (chat, ack) {
                try {
                    room_chat_nsp.to(chat.room_id).emit('new_message', { chat });
                    await room_chat_handler.save_chat_to_db(chat, user_id);
                } catch (error) {
                    console.error(error)
                }
            });

            socket.on('typing', function (conversation_id) {
                socket.to(conversation_id).emit('user_typing', { status: 1 });
            });

            socket.on('typing_stopped', function (conversation_id) {
                socket.to(conversation_id).emit('user_typing_stopped', { status: 'stopped' });
            });

            socket.on('disconnect', async function (reason) {
               await session_handler.log_end(user_id, time_start);
               //console.log(`socket ${socket.id} just got disconnected!`);
            });
        });
    } catch (error) {
        console.error(error);
    }
}