const now = new Date;

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Magellol',
        createdAt: now,
        updatedAt: now
      }
    ])
  }
};
