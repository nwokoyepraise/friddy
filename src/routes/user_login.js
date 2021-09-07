const router = require('express').Router();
const user_auth_handler = require('../services/user_auth _handler');
const base_response = require('./base_response')

module.exports = router.post('', async function (req, res) {
    try {

        let data = await user_auth_handler.user_login(req.body);
        //revert response to user
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

