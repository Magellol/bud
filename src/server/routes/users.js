const { wrap } = require('co');
const { Models } = require('../models');
const { formatSuccess } = require('../helpers/responses');

module.exports = function userRoutes(router) {
  router.get('/', wrap(function* (req, resp) {
    const users = yield Models.User.findAll();
    const response = users.map(user => user.get());

    return resp.json(formatSuccess(response));
  }));

  router.post('/new', wrap(function* (req, resp, next) {
    const { username } = req.body.payload;
    const user = Models.User.build({ username });

    try {
      const result = yield user.save();
      return resp.json(formatSuccess(result));
    } catch (error) {
      return next(error);
    }
  }));

  return router;
};
