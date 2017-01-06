module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    amount: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'You must provide an amount'
        },
        isDecimal: {
          msg: 'The amount must be a decimal (i.e 20.00)'
        },
        min: {
          args: 0.01,
          msg: 'Your amount cannot be less than one cent'
        }
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Invalid name');
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
          msg: 'The expense name must be between 3 and 30 characters long'
        }
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
