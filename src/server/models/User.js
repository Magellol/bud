module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('The name must be a string');
          }
        },
        notEmpty: {
          msg: 'You must provide a username'
        },
        isAlpha: {
          msg: 'Your username can only contain letters'
        },
        len: {
          args: [3, 20],
          msg: 'Your username must be between 3 and 20 characters long'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.ExpenseCategory);
      }
    }
  });

  return User;
};
