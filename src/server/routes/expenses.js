const { wrap } = require('co');
const { Models } = require('../models');
const { formatSuccess } = require('../helpers/responses');
const { createValidationError } = require('../helpers/errors');

module.exports = function expenseRoutes(express) {
  const router = express.Router();

  router.post('/new', wrap(function* (req, resp, next) {
    const { amount, name, ExpenseCategoryId } = req.body.payload;

    try {
      const category = yield Models.ExpenseCategory.findOne({
        attributes: ['id'],
        where: { id: ExpenseCategoryId, UserId: req.session.user.id }
      });

      if (category === null) {
        throw createValidationError(
          'ExpenseCategoryId',
          'The category associated to the expense does not exist. ' +
          'Therefore the expense could not be added. It requires a valid category.'
        );
      }

      const expense = Models.Expense.build({ amount, name, ExpenseCategoryId });
      const result = yield expense.save();

      return resp.json(formatSuccess(result));
    } catch (error) {
      return next(error);
    }
  }));

  return router;
};
