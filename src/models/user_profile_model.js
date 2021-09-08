const mongo_conn = require('../config/mongo_config');
const user_schema = require('./user_schema');

module.exports.get_profile_data = async function (field, value) {
    try {
        const user_model = mongo_conn.model('user_profile', user_schema, 'user_profile');
        //retrieve data from DB
        return await user_model.
            findOne({ [field]: value }).
            select({email: 1, password: 1, username: 1, user_id: 1, timestamp: 1}).
            lean();
    } catch (error) {
        console.log(error);
    }
}

module.exports.create_user = async function (user_id, username, email, password) {
    try {
        const user_model = mongo_conn.model('user_profile', user_schema, 'user_profile');
        return await user_model.create({ user_id: user_id, username: username, email: email, password: password });

    } catch (error) {
        console.log(error);
    }
}
