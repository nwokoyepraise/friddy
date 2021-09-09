const session = require('./session');

module.exports.log_start = async function (user_id, time_start) {
    try {
        return await session.updateOne({ user_id: user_id },
            { $push: { session_log: { time_start: time_start} } },
            { runValidators: true, upsert: true });
    } catch (error) {
        console.log(error);
    }
}

module.exports.log_end = async function (user_id, time_start) {
    try {
        return await session.updateOne({ user_id: user_id },
            { $set: { 'session_log.$[index].time_end': new Date()}},
            { runValidators: true, arrayFilters: [{'index.time_start': time_start}]});
    } catch (error) {
        console.log(error);
    }
}