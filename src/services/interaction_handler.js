const interaction_model = require('../models/interaction_model');

module.exports.log_interaction = async function (user_id, action, room_id) {
    try {
        let data = await interaction_model.log_interaction(user_id, action, room_id)
    } catch (error) {
        console.error(error);
    }
}