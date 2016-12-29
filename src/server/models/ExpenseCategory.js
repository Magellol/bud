module.exports = (sequelize, DataTypes) => {
  const ExpenseCategory = sequelize.define('ExpenseCategory', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
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
