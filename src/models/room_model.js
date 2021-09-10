const room = require('./room');

module.exports.create_room = async function (room_name) {
    try {
        return await room.create({ room_name: room_name });
    } catch (error) {
        console.log(error);
    }
}

module.exports.join_room = async function (room_id, user_id) {
    try {
        return await room.findOneAndUpdate({ _id: room_id }, { $addToSet: { members: user_id }, $inc: { member_count: 1 } }, { new: true });
    } catch (error) {
        console.log(error);
    }
}

module.exports.get_members = async function (room_id) {
    try {
        return await room.findOne({ _id: room_id }).select({ members: 1 }).lean();
    } catch (error) {
        console.error(error);
    }
}

module.exports.update_message_count = async function (room_id) {
    try {
        return await room.updateOne({ _id: room_id }, { $inc: { message_count: 1 } })
    } catch (error) {
        console.error(error);
    }
}