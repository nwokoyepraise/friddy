const session_model = require('../models/session_model')

module.exports.log_start = async function (user_id, time_start) {
    try {
        let data = await session_model.log_start(user_id, time_start)
    } catch (error) {
        console.error(error);
    }
}

module.exports.log_end = async function (user_id, time_start) {
    try {
        let data = await session_model.log_end(user_id, time_start)
    } catch (error) {
        console.error(error);
    }
}