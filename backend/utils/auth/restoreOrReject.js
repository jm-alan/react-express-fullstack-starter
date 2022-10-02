const restoreUser = require('./restoreUser');
const rejectUnauthorized = require('./rejectUnauthorized');

module.exports = [
  restoreUser,
  rejectUnauthorized
];
