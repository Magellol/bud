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
          expense_category_id: category.get('id'),
          created_at: now,
          updated_at: now
        },
        {
          amount: 145.99,
          name: 'TV on black friday baby',
          expense_category_id: category.get('id'),
          created_at: now,
          updated_at: now
        }
      ]);
    });
  }
};
