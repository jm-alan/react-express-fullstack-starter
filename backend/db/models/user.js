const {
  Model,
  ValidationErrorItem,
  ValidationError,
  DataTypes: {
    STRING,
    DATE,
    NOW,
    INTEGER
  }
} = require('sequelize');
const { hashSync, compareSync } = require('bcryptjs');

module.exports = class User extends Model {
  validatePass (password) {
    return !!password && compareSync(password, this.password);
  }

  get info () {
    return {
      id: this.id,
      firstName: this.firstName,
      email: this.email
    };
  }

  static async LogIn ({ email, password }) {
    const errors = [];
    if (!email) {
      errors.push(new ValidationErrorItem('Please provide an email address'));
    }
    if (!password) {
      errors.push(new ValidationErrorItem('Please provide a password'));
    }
    if (errors.length) {
      throw new ValidationError('Invalid login', errors);
    }
    const potentialUser = await User.scope('login').findOne({
      where: { email }
    });
    if (!potentialUser || !potentialUser.validatePass(password)) {
      errors.push(new ValidationErrorItem('Invalid email or password'));
      throw new ValidationError('Invalid login', errors);
    }
    return potentialUser;
  }

  static async SignUp ({ firstName, email, password }) {
    email &&= email.toLowerCase();
    const errors = [];
    if (!firstName) {
      errors.push(new ValidationErrorItem('Please provide a first name'));
    }
    if (!email) {
      errors.push(new ValidationErrorItem('Please provide an email address'));
    }
    if (!password) {
      errors.push(new ValidationErrorItem('Please provide a password'));
    }
    if (await User.findOne({ where: { email } })) {
      errors.push(new ValidationErrorItem('An account already exists with that email'));
    }
    if (errors.length) {
      throw new ValidationError('Could not accept identification', errors);
    }
    const newUser = new User({ firstName, email, password });
    return await newUser.save();
  }

  static setup (sequelize) {
    super.init({
      firstName: {
        type: STRING,
        allowNull: false
      },
      email: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please provide a valid email address'
          }
        }
      },
      password: {
        type: STRING,
        allowNull: false,
        set (val) {
          const errors = [];
          if (val.length < 8) {
            errors.push(
              new ValidationErrorItem(
                'Password must be at least 8 characters.'
              )
            );
          }
          if (!val.match(/[A-Z]+/)) {
            errors.push(
              new ValidationErrorItem(
                'Password must contain at least 1 uppercase letter.'
              )
            );
          }
          if (!val.match(/[a-z]+/)) {
            errors.push(
              new ValidationErrorItem(
                'Password must contain at least 1 lowercase letter.'
              )
            );
          }
          if (!val.match(/[0-9]+/)) {
            errors.push(
              new ValidationErrorItem(
                'Password must contain at least 1 of these symbols: !@#$%^&*()`~-'
              )
            );
          }
          if (!val.match(/^[a-zA-Z0-9!@#$%^&*()`~-]+$/)) {
            errors.push(
              new ValidationErrorItem(
                'Password may only contain letters, numbers, and these symbols: !@#$%^&*()`~-'
              )
            );
          }
          if (errors.length) {
            throw new ValidationError('Invalid password.', errors);
          } else {
            this.setDataValue('password', hashSync(val));
          }
        }
      },
      primaryHouseID: {
        type: INTEGER,
        allowNull: true,
        references: {
          model: 'Houses'
        }
      },
      createdAt: {
        type: DATE,
        defaultValue: NOW
      },
      updatedAt: {
        type: DATE,
        defaultValue: NOW
      }
    }, {
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      },
      scopes: {
        login: {
          attributes: {
            include: ['password']
          }
        }
      },
      sequelize
    });
  }

  static associate ({ Item, DebtEntry, House, RosterEntry }) {
    User.belongsTo(House, { foreignKey: 'primaryHouseID', as: 'PrimaryResidence' });
    User.hasMany(House, { foreignKey: 'ownerID', as: 'OwnedResidences' });
    User.hasMany(Item, { foreignKey: 'userID', as: 'Credits' });
    User.belongsToMany(Item, {
      through: DebtEntry,
      foreignKey: 'userID',
      otherKey: 'itemID',
      as: 'Debts'
    });
    User.belongsToMany(House, {
      through: RosterEntry,
      foreignKey: 'userID',
      otherKey: 'houseID',
      as: 'Residences'
    });
  }
};
