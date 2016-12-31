const { wrap } = require('co');
const { Models } = require('../models');
const { formatSuccess } = require('../helpers/responses');

module.exports = function expenseCategoriyRoutes(express) {
  const router = express.Router();

  router.get('/', wrap(function* (req, resp) {
    const { id: userId } = req.session.user;
    const categories = yield Models.ExpenseCategory.findAll({
      where: { userId }
    }).map(category => category.get());

    return resp.json(formatSuccess(categories));
  }));

  return router;
};
