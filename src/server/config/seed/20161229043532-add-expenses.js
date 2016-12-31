const now = new Date();
const { Models } = require('../../models');

module.exports = {
  up(queryInterface) {
    const category = Models.ExpenseCategory.findOne({
      attributes: ['id']
    });

    return category.then(entity => (
      queryInterface.bulkInsert('Expenses', [
        {
          amount: 65.00,
          name: 'My awesome expense',
          ExpenseCategoryId: entity.get('id'),
          createdAt: now,
          updatedAt: now
        },
        {
          amount: 145.99,
          name: 'TV on black friday baby',
          ExpenseCategoryId: entity.get('id'),
          createdAt: now,
          updatedAt: now
        }
      ])
    ));
  }
};
