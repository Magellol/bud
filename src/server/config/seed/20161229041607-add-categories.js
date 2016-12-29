const now = new Date;
const { Models } = require('../../models');

module.exports = {
  up(queryInterface, Sequelize) {
    const user = Models.User.findOne({
      attributes: ['id']
    });

    return user.then(user => {
      return queryInterface.bulkInsert('ExpenseCategories', [
        {
          name: 'Video Games',
          userId: user.get('id'),
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Groceries',
          userId: user.get('id'),
          createdAt: now,
          updatedAt: now
        }
      ]);
    });
  }
};
