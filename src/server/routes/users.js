const { wrap } = require('co');
const { Models } = require('../models');
const { formatSuccess } = require('../helpers/responses');
const { createValidationError } = require('../helpers/errors');

// TODO
// Do some try...catch to these routes to handle DB level errors for example, to avoid crashing node.
module.exports = function userRoutes(express) {
  const router = express.Router();

  router.get('/', wrap(function* (req, resp) {
    const users = yield Models.User.findAll();
    const response = users.map(user => user.get());

    return resp.json(formatSuccess(response));
  }));

  router.post('/login', wrap(function* (req, resp, next) {
    const { username } = req.body.payload;
    const user = yield Models.User.findOne({
      where: { username }
    });

    // That'll reset the session if attempting to login with a bad user.
    req.session.user = user; // eslint-disable-line no-param-reassign

    if (user === null) {
      const error = createValidationError('username', 'We could not find the user you are looking for');
      return next(error);
    }

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
