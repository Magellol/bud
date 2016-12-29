module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    amount: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ExpenseCategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'ExpenseCategories',
        key: 'id',
        deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
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
