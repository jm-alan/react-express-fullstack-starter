const { Model, DataTypes: { INTEGER } } = require('sequelize');

module.exports = class RosterEntry extends Model {
  static setup (sequelize, { User, House }) {
    super.init({
      userID: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: User
        }
      },
      houseID: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: House
        }
      }
    }, {
      modelName: 'RosterEntry',
      sequelize
    });
  }

  static associate ({ User, House }) {
    RosterEntry.belongsTo(User, { foreignKey: 'userID', as: 'Resident' });
    RosterEntry.belongsTo(House, { foreignKey: 'houseID' });
  }
};
