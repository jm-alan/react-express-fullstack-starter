const { jwtConfig, isProduction } = require('../../config/server');
const createToken = require('./createToken');

module.exports = (res, userID) => {
  const token = createToken(userID);
  res.cookie('token', token, {
    maxAge: jwtConfig.expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'lax'
  });
};
