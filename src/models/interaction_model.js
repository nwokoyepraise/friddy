const interaction = require('./interaction');

module.exports.log_interaction = async function (user_id, action, room_id) {
    try {
        return await interaction.updateOne({ user_id: user_id },
            { $push: { interaction_log: { action: action, room_id: room_id } } },
            { runValidators: true, upsert: true });
    } catch (error) {
        console.log(error);
    }
}