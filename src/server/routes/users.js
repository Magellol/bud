const { wrap } = require('co');
const { Models, connection } = require('../models');
const { formatSuccess } = require('../helpers/responses');
const { createValidationError } = require('../helpers/errors');

module.exports = function userRoutes(router) {
  router.get('/', wrap(function* (req, resp) {
    const users = yield Models.User.findAll();
    const response = users.map(user => user.get());

    return resp.json(formatSuccess(response));
  }));

  router.post('/login', wrap(function* (req, resp, next) {
    if (req.session.user) {
      return resp.json(formatSuccess());
    }

    const { username } = req.body.payload;
    const user = yield Models.User.findOne({
      where: { username }
    });

    if (user === null) {
      const error = createValidationError('username', 'We could not find the user you are looking for');
      return next(error);
    }

    req.session.user = user; // eslint-disable-line no-param-reassign
    return resp.json(formatSuccess());
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
