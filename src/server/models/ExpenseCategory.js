module.exports = (sequelize, DataTypes) => {
  const ExpenseCategory = sequelize.define('ExpenseCategory', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('The name must be a string');
          }
        },
        notEmpty: {
          msg: 'You must provide a name'
        },
        is: {
          msg: 'The name can only include letters, numbers and spaces',
          args: /^[a-zA-Z0-9 ]+$/
        },
        len: {
          args: [3, 30],
          msg: 'The category name must be between 3 and 30 characters long'
        }
      },
      set(value) {
        this.setDataValue('name', value.trim());
      }
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
