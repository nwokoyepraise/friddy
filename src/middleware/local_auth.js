require('dotenv').config();
const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const user_profile_model = require('../models/user_profile_model');
const argon2 = require('argon2');


passport.use(
    new local_strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                //retrieve credential from DB
                let user = await user_profile_model.get_profile_data('email', email);

                //return if user record is not found
                if (!user?.email) {
                    return done(null, false)
                }
                //unhash and verify password
                if (!(await argon2.verify(user.password, password))) { return done(null, false) }

                return done(null, user)
            } catch (error) {
                done(error);
                console.error(error)
            }
        }
    )
);