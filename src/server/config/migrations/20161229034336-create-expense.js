const TABLENAME = 'Expenses';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLENAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2).UNSIGNED,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      ExpenseCategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ExpenseCategories',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'UTF8'
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable(TABLENAME);
  }
};
