const router = require('express').Router();
const group_handler = require('../services/group_handler');

module.exports = router.post('', async function (req, res, next) {
    try {
        res.locals.data = await group_handler.join_group(req.body, req.user);
        //revert response to user 
        next();

    } catch (error) {
        console.error(error);
    }
});