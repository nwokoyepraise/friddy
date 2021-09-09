
module.exports = function (room_chat_nsp) {
    try {
        room_chat_nsp.on('connection', socket => {
            let user_id = socket.request.user.user_id;

            socket.on('join_room', async function (room_id) {
                socket.join(room_id);
                console.log(`socket ${socket.id} joined room ${room_id}!`)
            });

            socket.on('message', async function (data, ack) {
                try {
                    room_chat_nsp.to(data.room_id).emit('new_message', {});
                    console.log('new_message');
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

            // socket.on('disconnect', async function (reason) {
            //     const session_mgmt_model = mongoose.model('conv_session_mgmt', session_mgmt_schema, 'conv_session_mgmt');
            //     await session_mgmt_model.deleteOne({ user_id: user_id });
            // });
        });
    } catch (error) {
        console.error(error);
    }
}