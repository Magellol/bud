const now = new Date();
const { Models } = require('../../models');

module.exports = {
  up(queryInterface) {
    const user = Models.User.findOne({
      attributes: ['id']
    });

    return user.then(entity => (
      queryInterface.bulkInsert('ExpenseCategories', [
        {
          name: 'Video Games',
          UserId: entity.get('id'),
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Groceries',
          UserId: entity.get('id'),
          createdAt: now,
          updatedAt: now
        }
      ])
    ));
  }
};
