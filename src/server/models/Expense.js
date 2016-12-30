module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    amount: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Expense.belongsTo(models.ExpenseCategory);
      }
    }
  });

  return Expense;
};
