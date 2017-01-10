const moment = require('moment');
const { wrap } = require('co');
const { Models, connection } = require('../models');
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
          'An expense must be associated to a category'
        );
      }

      const expense = Models.Expense.build({ amount, name, ExpenseCategoryId });
      const result = yield expense.save();

      return resp.json(formatSuccess(result));
    } catch (error) {
      return next(error);
    }
  }));

  router.get('/monthly/:year/:month', wrap(function* (req, resp, next) {
    const months = moment.months().map(m => m.toLowerCase());
    const { month, year } = req.params;

    if (year.match(/\b[0-9]{4}\b/) === null) {
      return next(createValidationError(':year', 'Invalid ":year" param passed when viewing monthly expenses'));
    }

    if (months.includes(month) === false) {
      return next(createValidationError(':month', 'Invalid ":month" param passed when viewing monthly expenses'));
    }

    const currentMonth = moment().year(year).month(month);
    const beginningOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');

    try {
      const categories = yield Models.ExpenseCategory.findAll({
        attributes: [
          'id',
          'name',
          'createdAt',
          [connection.Sequelize.fn('SUM', connection.Sequelize.col('Expenses.amount')), 'totalExpenses']
        ],
        where: {
          createdAt: { $lte: endOfMonth }
        },
        group: [connection.Sequelize.col('id')],
        include: [
          {
            attributes: [],
            required: false,
            model: Models.Expense,
            where: {
              createdAt: {
                $gte: beginningOfMonth,
                $lte: endOfMonth
              }
            }
          }
        ]
      });

      return resp.send(formatSuccess(categories));
    } catch (error) {
      return next(error);
    }
  }));

  return router;
};
