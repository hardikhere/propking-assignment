const jwt = require('jsonwebtoken');
require('dotenv').config();

async function jwtGenerator(id) {
    const payload = {
        id
    };
    return await jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '1000d' });
}

module.exports = { jwtGenerator }