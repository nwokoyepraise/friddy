const group_model = require('../models/group_model');

module.exports.create_group = async function (body, user) {
    try {
        let res0 = await group_model.create_group(body.group_name);
      
        if (!res0 || !res0._id) { return { status: false, status_code: 500, message: 'Internal Server Error' } }
        return { status: true, data: res0 }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}