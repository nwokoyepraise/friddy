require('dotenv').config();
const passport = require('passport');
const jwt_strategy = require('passport-jwt').Strategy;
const extract_jwt = require('passport-jwt').ExtractJwt;
const key = process.env.JWTKEY;
const user_profile_model = require('../models/user_profile_model');

let opts = {}
opts.jwtFromRequest = extract_jwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

passport.use(new jwt_strategy(opts, async function (jwt_payload, done) {
    try {
        let user = await user_profile_model.get_profile_data('user_id', jwt_payload.sub);
        if (!user || !user.user_id) {
            return done(null, false);
        }
        else if (user) {
            return done(null, user);
        }
    } catch (error) {
        done(error);
        console.error(error);
    }
}));