const TABLENAME = 'ExpenseCategories';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLENAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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

  down(queryInterface) {
    return queryInterface.dropTable(TABLENAME);
  }
};
