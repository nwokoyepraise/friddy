const session = require('./session');

module.exports.log_interaction = async function (user_id, time_start) {
    try {
        return await session.updateOne({ user_id: user_id },
            { $push: { session_log: { time_start: time_start} } },
            { runValidators: true, upsert: true });
    } catch (error) {
        console.log(error);
    }
}