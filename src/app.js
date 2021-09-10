require('dotenv').config();
require('./middleware/jwt_auth');
require('./middleware/local_auth');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = 3000;
const passport = require('passport');
const base_response = require('./middleware/base_response');
const user_reg = require('./routes/user_reg');
const user_login = require('./routes/user_login');
const create_room = require('./routes/create_room');
const join_room = require('./routes/join_room');
const io = require('socket.io')(server);
const room_chat_nsp = io.of('/chat_room');
const room_chat = require('./routes/room_chat');

app.use(express.json());

//load routes
app.use('/api/user_reg', user_reg, base_response);
app.use('/api/user_login', passport.authenticate('local', { session: false }), user_login, base_response);
app.use('/api/room_chats/create_room', passport.authenticate('jwt', { session: false }), create_room, base_response);
app.use('/api/room_chats/join_room', passport.authenticate('jwt', { session: false }), join_room, base_response);

// const wrap_middleware = middleware => (socket, next) => middleware(socket.request, {}, next);
// wrap_middleware(passport.authenticate('jwt', { session: false })), 
room_chat(room_chat_nsp);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket.html');
});

server.listen(port_number, function () {
    console.log(`server listening on port ${port_number}`);
});