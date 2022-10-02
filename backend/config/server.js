const { resolve } = require('path');
const { config } = require('dotenv');
config(resolve('../.env'));

const {
  PORT: port,
  SECRET: secret,
  EXPIRES: expiresIn,
  NODE_ENV: environment = 'development'
} = process.env;

module.exports = {
  port,
  jwtConfig: { secret, expiresIn: parseInt(expiresIn) },
  environment,
  isProduction: environment === 'production'
};
