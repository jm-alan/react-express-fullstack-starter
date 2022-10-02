const { Sequelize } = require('sequelize');

const User = require('./user');
const Item = require('./item');
const House = require('./house');
const DebtEntry = require('./debtEntry');
const RosterEntry = require('./rosterEntry');
const config = require('../../config/database');

const sequelize = new Sequelize(process.env.DATABASE_URL, config);

const models = {
  User,
  House,
  Item,
  DebtEntry,
  RosterEntry
};

for (const key in models) {
  models[key].setup(sequelize, models);
}

for (const key in models) {
  models[key].associate(models);
}

module.exports = { ...models, sequelize, Sequelize };
