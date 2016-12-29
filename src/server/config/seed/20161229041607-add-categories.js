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
          user_id: user.get('id'),
          created_at: now,
          updated_at: now
        },
        {
          name: 'Groceries',
          user_id: user.get('id'),
          created_at: now,
          updated_at: now
        }
      ]);
    });
  }
};
