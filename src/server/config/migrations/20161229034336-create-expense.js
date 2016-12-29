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
      expense_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ExpenseCategories',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
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
