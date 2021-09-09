const room_model = require('../models/room_model');

module.exports.create_room = async function (body, user) {
    try {
        if (!body || !body.room_name) { return { status: false, status_code: 400, message: 'Room name field cannot be null' } }

        let res0 = await room_model.create_room(body.room_name);

        if (!res0 || !res0._id) { return { status: false, status_code: 500, message: 'Internal Server Error' } }
        return { status: true, data: res0 }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}

module.exports.join_room = async function (body, user) {
    try {
        if (!body || !body.room_id) { return { status: false, status_code: 400, message: 'room id field cannot be null' } }

        //check and return if user is already added to group
        let res0 = await room_model.get_members(body.room_id);
        if (res0 && res0.members && res0.members.includes(user.user_id)) { return { status: false, status_code: 404, message: 'User already a member of room' } }

        //add user to room
        let res1 = await room_model.join_room(body.room_id, user.user_id);

        //return if there is no match to document id i.e room not found
        if (res1.matchedCount == 0) { return { status: false, status_code: 404, message: 'Room not found' } }

        //return if update was not successful
        if (!res1 || res1.modifiedCount != 1) { return { status: false, status_code: 500, message: 'Internal Server Error' } }

        //kog user interaction
        await interaction_handler.log_interaction(user.user_id, 'join_room', body.room_id);

        //revert response data
        return { status: true, data: { message: 'success' } }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}