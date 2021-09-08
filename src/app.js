require('dotenv').config();
require('./middleware/jwt_auth');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = 3000;
const user_reg = require('./routes/user_reg');
const user_login = require('./routes/user_login');
const create_group = require('./routes/create_group');
const passport = require('passport');
const base_response = require('./middleware/base_response');

app.use(express.json());

//load routes
app.use('/api/user_reg', user_reg, base_response);
app.use('/api/user_login', user_login, base_response);
app.use('/api/groups/create_group', passport.authenticate('jwt', {session: false}) , create_group, base_response);

server.listen(port_number, function () {
    console.log(`server listening on port ${port_number}`);
});