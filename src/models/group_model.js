const mongo_conn = require('../config/mongo_config');
const group_schema = require('./group_schema');

module.exports.create_group = async function (group_name) {
    try {
        const group_model = mongo_conn.model('groups', group_schema, 'groups');
        return await group_model.create({ group_name: group_name});
    } catch (error) {
        console.log(error);
    }
}