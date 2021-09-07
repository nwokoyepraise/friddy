const router = require('express').Router();
const user_reg_handler = require('../services/user_reg_handler');
const base_response = require('./base_response')

module.exports = router.post('', async function (req, res) {
    try {

        let data = await user_reg_handler.reg_user(req.body);
        //revert response to user
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

