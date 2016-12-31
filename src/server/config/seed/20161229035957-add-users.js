const now = new Date();

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Magellol',
        createdAt: now,
        updatedAt: now
      }
    ]);
  }
};
