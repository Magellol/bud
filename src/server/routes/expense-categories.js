const moment = require('moment');
const { wrap } = require('co');
const { Models } = require('../models');
const { formatSuccess } = require('../helpers/responses');
const { createError } = require('../helpers/errors');
const HttpCodes = require('../constants/httpStatus');

module.exports = function expenseCategoryRoutes(express) {
  const router = express.Router();

  router.get('/', wrap(function* (req, resp, next) {
    const { id: UserId } = req.session.user;

    try {
      const categories = yield Models.ExpenseCategory.findAll({
        attributes: ['id', 'name'],
        where: { UserId }
      }).map(category => category.get());

      return resp.json(formatSuccess(categories));
    } catch (error) {
      return next(error);
    }
  }));

  router.post('/new', wrap(function* (req, resp, next) {
    const { name } = req.body.payload;

    try {
      const category = Models.ExpenseCategory.build({
        name,
        UserId: req.session.user.id
      });

      const result = yield category.save();
      return resp.json(formatSuccess(result));
    } catch (error) {
      return next(error);
    }
  }));

  router.get('/:year/:month/:id', wrap(function* (req, resp, next) {
    const { year, month, id } = req.params;

    const currentMonth = moment().year(year).month(month);
    const beginningOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');

    try {
      const category = yield Models.ExpenseCategory.findOne({
        attributes: [
          'id',
          'name'
        ],
        where: { id, UserId: req.session.user.id },
        order: [[Models.Expense, 'createdAt', 'DESC']],
        include: {
          attributes: ['id', 'name', 'createdAt', 'amount'],
          required: false,
          model: Models.Expense,
          where: {
            createdAt: {
              $gte: beginningOfMonth,
              $lte: endOfMonth
            }
          }
        }
      });

      if (category === null) {
        return next(createError('The requested category does not exist', HttpCodes.notFound));
      }

      return resp.json(formatSuccess(category));
    } catch (error) {
      return next(error);
    }
  }));

  return router;
};
