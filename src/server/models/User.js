module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(60),
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
          args: [3, 60],
          msg: 'Your username must be between 3 and 60 characters long'
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
