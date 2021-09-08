const router = require('express').Router();
const user_auth_handler = require('../services/user_auth _handler');
const base_response = require('../middleware/base_response')

module.exports = router.post('', async function (req, res, next) {
    try {

        res.locals.data = await user_auth_handler.user_login(req.body);
        //revert response to user
        next();

    } catch (error) {
        console.error(error);
    }
});

