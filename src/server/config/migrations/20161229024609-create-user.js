const TABLENAME = 'Users';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLENAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(60),
        unique: true
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
