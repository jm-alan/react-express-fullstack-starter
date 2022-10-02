const { sign } = require('jsonwebtoken');
const { jwtConfig: { secret, expiresIn } } = require('../../config/server');

module.exports = userID => sign(
  { userID },
  secret,
  { expiresIn }
);
