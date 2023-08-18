const { sign,verify} = require('jsonwebtoken'); //in need of assessment
require('dotenv').config();

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    },
    process.env.SECRET_KEY,{
        expiresIn: '1h'
    })
};

module.exports = {
    createToken
};
