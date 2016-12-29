module.exports = (sequelize, DataTypes) => {
  const ExpenseCategory = sequelize.define('ExpenseCategory', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        ExpenseCategory.belongsTo(models.User);
        ExpenseCategory.hasMany(models.Expense);
      }
    }
  });

  return ExpenseCategory;
};
