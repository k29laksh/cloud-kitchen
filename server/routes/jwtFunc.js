const jwt = require('jsonwebtoken');
// Token generation function
module.exports.generateJWT = (homemakerId) => {
    return jwt.sign({ id: homemakerId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

// Refresh token generation function
module.exports.refreshJWTToken = (homemakerId) => {
    return jwt.sign({ id: homemakerId }, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
};