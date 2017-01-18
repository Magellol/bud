const moment = require('moment');
const { wrap } = require('co');
const { Models, connection } = require('../models');
const { formatSuccess } = require('../helpers/responses');
const { createValidationError, createError } = require('../helpers/errors');
const HttpCodes = require('../constants/httpStatus');

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

  router.get('/:id', wrap(function* (req, resp, next) {
    try {
      const expense = yield Models.Expense.findOne({
        attributes: ['id', 'name', 'createdAt', 'amount'],
        where: { id: req.params.id },
        include: [
          {
            attributes: ['id', 'name'],
            model: Models.ExpenseCategory,
            where: { UserId: req.session.user.id },
            required: true
          }
        ]
      });

      if (expense === null) {
        return next(createError('This expense does not exist', HttpCodes.notFound));
      }

      return resp.json(formatSuccess(expense));
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
          createdAt: { $lte: endOfMonth },
          UserId: req.session.user.id
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

      const result = categories
        .map(category => category.get())
        .sort((a, b) => {
          if (a.totalExpenses < b.totalExpenses) {
            return 1;
          }

          return a.totalExpenses > b.totalExpenses ? -1 : 0;
        });

      return resp.send(formatSuccess(result));
    } catch (error) {
      return next(error);
    }
  }));

  router.post('/update', wrap(function* (req, resp, next) {
    const { id, ExpenseCategoryId } = req.body.payload;

    try {
      const expense = yield Models.Expense.findOne({
        attributes: ['id'],
        where: { id },
        include: [
          {
            attributes: ['id', 'UserId'],
            model: Models.ExpenseCategory,
            where: { UserId: req.session.user.id }
          }
        ]
      });

      if (expense === null) {
        return next(createError('This expense does not exist', 404));
      }

      const category = yield Models.ExpenseCategory.findOne({
        attributes: ['id'],
        where: { id: ExpenseCategoryId, UserId: req.session.user.id }
      });

      if (category === null) {
        return next(createError('The updated category does not exist', 404));
      }

      yield expense.update({ ExpenseCategoryId });

      return resp.json(formatSuccess());
    } catch (error) {
      return next(error);
    }
  }));

  router.post('/delete', wrap(function* (req, resp, next) {
    const { id } = req.body.payload;

    try {
      const expense = yield Models.Expense.findOne({
        attributes: ['id'],
        where: { id },
        include: [
          {
            required: true,
            attributes: ['id'],
            model: Models.ExpenseCategory,
            where: { UserId: req.session.user.id }
          }
        ]
      });

      if (expense === null) {
        return next(createError(
          `Expense with id: "${id}" does not exist`,
          404
        ));
      }

      yield expense.destroy();

      return resp.json(formatSuccess());
    } catch (error) {
      return next(error);
    }
  }));

  return router;
};
