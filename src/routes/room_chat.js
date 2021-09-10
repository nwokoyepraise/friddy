const room_chat_handler = require('../services/room_chat_handler');
const session_handler = require('../services/session_handler');
const interaction_handler = require('../services/interaction_handler');
const room_model = require('../models/room_model');

module.exports = function (room_chat_nsp) {
    try {
        var user_id;
        room_chat_nsp.use(async function (socket, next) {
            try {
                if (socket?.request?.headers?.authorization) {

                    let auth_header = socket.request.headers.authorization;
                    let user = await room_chat_handler.auth_conn(auth_header);

                    if (!user) { return next(new Error('Authentication error')); }
                    user_id = user;
                    next();
                }
            } catch (error) {
                console.error(error)
            }

        });

        room_chat_nsp.on('connection', async (socket) => {
            // let user_id = socket.request.user.user_id;
            let time_start = new Date();

            await session_handler.log_start(user_id, time_start);
            //console.log(`socket ${socket.id} just got connected!`);

            socket.on('join_room', async function (room_id) {
                socket.join(room_id);
                //console.log(`socket ${socket.id} joined room ${room_id}!`)
            });

            socket.on('message', async function (chat, ack) {
                try {
                    //check and revert is not a member of room or if room does not exist
                    let members = (await room_model.get_members(chat.room_id)).members;
                    
                    if (!members || !members.includes(user_id)) {
                        //emit error message to particular socket
                        return room_chat_nsp.to(socket.id).emit('message_error', 'user not a member of room or room not found');
                    }
                    //emit message to room
                    room_chat_nsp.to(chat.room_id).emit('new_message', {...chat, sender_id: user_id});

                    //save chat to db
                    await room_chat_handler.save_chat_to_db(chat, user_id);

                    //log user interaction
                    await interaction_handler.log_interaction(user_id, 'chat_message', chat.room_id);
                } catch (error) {
                    console.error(error)
                }
            });

            socket.on('typing', function (room_id) {
                socket.to(room_id).emit('user_typing', { status: true, user_id: user_id });
            });

            socket.on('typing_stopped', function (room_id) {
                socket.to(room_id).emit('user_typing', { status: false, user_id: user_id });
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