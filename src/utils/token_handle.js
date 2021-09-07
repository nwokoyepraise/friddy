require('dotenv').config();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const key = process.env.JWTKEY;

module.exports.gen_jwt = function (user) {
    return jwt.sign(user, key, { expiresIn: '86400s' });
}

module.exports.hash_password = async function (password) {
    try {
        return await argon2.hash(password);
    } catch (error) {
        console.error(error);
    }
}