const router = require('express').Router();
const user_auth_handler = require('../services/user_login _handler');
const base_response = require('../middleware/base_response');
const user_login_handler = require('../services/user_login _handler');

module.exports = router.post('', async function (req, res, next) {
    try {

        res.locals.data = await user_login_handler(req.user);
        //revert response to user
        next();

    } catch (error) {
        console.error(error);
    }
});

