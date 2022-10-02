const { verify } = require('jsonwebtoken');
const { jwtConfig: { secret } } = require('../../config/server');
const { User } = require('../../db/models');

module.exports = async (req, res, next) => {
  const { cookies: { token } } = req;

  try {
    const { userID } = verify(token, secret);
    req.user = await User.findByPk(userID);
    req.user ?? res.clearCookie('token');
    next();
  } catch {
    next();
  }
};
