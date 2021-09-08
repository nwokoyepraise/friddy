const group_model = require('../models/group_model');

module.exports.create_group = async function (body, user) {
    try {
        if (!body || !body.group_name) { return { status: false, status_code: 400, message: 'Group name field cannot be null' } }

        let res0 = await group_model.create_group(body.group_name);

        if (!res0 || !res0._id) { return { status: false, status_code: 500, message: 'Internal Server Error' } }
        return { status: true, data: res0 }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}

module.exports.join_group = async function (body, user) {
    try {
        if (!body || !body.group_id) { return { status: false, status_code: 400, message: 'Group id field cannot be null' } }

        //check and return if user is already added to group
        let res0 = await group_model.get_members(body.group_id);
        if (res0 && res0.members && res0.members.includes(user.user_id)) { return { status: false, status_code: 404, message: 'User already a member of group' } }

        let res1 = await group_model.join_group(body.group_id, user.user_id);

        //return if there is no match to document id
        if (res1.matchedCount == 0) { return { status: false, status_code: 404, message: 'Group not found' } }
        
        //return if update was successfulI
        if (!res1 || res1.modifiedCount != 1) { return { status: false, status_code: 500, message: 'Internal Server Error' } }
        return { status: true, data: { message: 'success' } }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}