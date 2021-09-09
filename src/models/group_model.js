const groups = require('./group');

module.exports.create_group = async function (group_name) {
    try {
        return await groups.create({ group_name: group_name });
    } catch (error) {
        console.log(error);
    }
}

module.exports.join_group = async function (group_id, user_id) {
    try {
        return await groups.updateOne({ _id: group_id }, { $addToSet: { members: user_id }, $inc: { member_count: 1 } });
    } catch (error) {
        console.log(error);
    }
}

module.exports.get_members = async function (group_id) {
    try {
        return await groups.findOne({ _id: group_id }).select({ members: 1 }).lean();
    } catch (error) {
        console.error(error);
    }
}