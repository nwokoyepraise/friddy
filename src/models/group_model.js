const mongo_conn = require('../config/mongo_config');
const group_schema = require('./group_schema');

module.exports.create_group = async function (group_name) {
    try {
        const group_model = mongo_conn.model('groups', group_schema, 'groups');
        return await group_model.create({ group_name: group_name });
    } catch (error) {
        console.log(error);
    }
}

module.exports.join_group = async function (group_id, user_id) {
    try {
        const group_model = mongo_conn.model('groups', group_schema, 'groups');
        return await group_model.updateOne({ _id: group_id }, { $addToSet: { members: user_id }, $inc: { member_count: 1 } });
    } catch (error) {
        console.log(error);
    }
}

module.exports.get_members = async function (group_id) {
    try {
        const group_model = mongo_conn.model('groups', group_schema, 'groups');
        return await group_model.findOne({ _id: group_id }).select({ members: 1}).lean();
    } catch (error) {
        console.error(error);
    }
}