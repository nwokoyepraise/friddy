const router = require('express').Router();
const room_handler = require('../services/room_handler');

module.exports = router.post('', async function (req, res, next) {
    try {
        //add user to room
        res.locals.data = await room_handler.join_room(req.body, req.user);
        //revert response to user 
        next();

    } catch (error) {
        console.error(error);
    }
});