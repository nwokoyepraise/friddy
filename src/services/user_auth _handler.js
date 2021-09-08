require('dotenv').config();
const user_profile_model = require('../models/user_profile_model');
const argon2 = require('argon2');
const token_handle = require('../utils/token_handle');
const passport = require('passport');
const jwt_strategy = require('passport-jwt').Strategy;
const extract_jwt = require('passport-jwt').ExtractJwt;
const key = process.env.JWTKEY;

module.exports.user_login = async function (body) {
    try {
        let email = body?.email?.toLowerCase(),
            password = body?.password;

        //return if any credential is null
        if (!email || !password) { return { status: false, status_code: 400, message: "Null values not allowed!" } }

        //retrieve credential from DB
        let res0 = await user_profile_model.get_profile_data('email', email);

        //return if user record is not found
        if (!res0?.email) { return { status: false, status_code: 404, message: "User does not exist!" } }

        //unhash and verify password
        if (!(await argon2.verify(res0.password, password))) { return { status: false, status_code: 401, message: "Invalid Credentials!" } }

        //generate new user tokens
        const jwt = token_handle.gen_jwt({ sub: res0.user_id });

        //if successful, return new credentials
        return { status: true, data: { user_id: res0.user_id, jwt: jwt } }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}

module.exports.jwt_auth = async function (user_id, jwt) {
    try {

        var opts = {}
        opts.jwtFromRequest = jwt;
        opts.secretOrKey = key;

        passport.use(new jwt_strategy(opts, async function (jwt_payload, done) {
            let user = await user_profile_model.get_profile_data('user_id', jwt_payload.sub);

            if (!user || !user.user_id || user.user_id != user_id) {
                return done(null, false);
            }
            return done(null, user);
        }));



        // var res0 = await mjwt.verify(jwt, key);
        // //if (!res0.email_verified) { return { status: false, message: 'Email not verified!' } }
        // if (res0.user_id == user_id) {
        //     return { status: true }
        // } else {
        //     return { status: false, message: 'JWT and user_id mismatch' }
        // }

    } catch (error) {
        console.error(error);
        if (error.name == 'TokenExpiredError') {
            return { status: false, message: 'TokenExpiredError' }
        }
        return { status: false, status_code: 401, message: 'Unauthorized' }
    }
}