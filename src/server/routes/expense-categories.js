const { wrap } = require('co');
const { Models } = require('../models');
const { formatSuccess } = require('../helpers/responses');

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

  return router;
};
