const now = new Date;
const { Models } = require('../../models');

module.exports = {
  up(queryInterface, Sequelize) {
    const category = Models.ExpenseCategory.findOne({
      attributes: ['id']
    });

    return category.then(category => {
      return queryInterface.bulkInsert('Expenses', [
        {
          amount: 65.00,
          name: 'My awesome expense',
          expenseCategoryId: category.get('id'),
          createdAt: now,
          updatedAt: now
        },
        {
          amount: 145.99,
          name: 'TV on black friday baby',
          expenseCategoryId: category.get('id'),
          createdAt: now,
          updatedAt: now
        }
      ]);
    });
  }
};
