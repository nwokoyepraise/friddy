require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = 3000;
const user_reg = require('./routes/user_reg');

app.use(express.json());

//load routes
app.use('/api/user_reg', user_reg);

server.listen(port_number, function () {
    console.log(`server listening on port ${port_number}`);
});