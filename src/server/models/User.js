module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
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
