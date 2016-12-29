const now = new Date;

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Magellol',
        created_at: now,
        updated_at: now
      }
    ])
  }
};
