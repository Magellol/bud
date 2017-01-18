const config = require('config');
const bodyParser = require('body-parser');
const Raven = require('../services/sentry');
const { connection: DbConnection } = require('../models');
const userRoutes = require('./users');
const expenseCategoryRoutes = require('./expense-categories');
const expenseRoutes = require('./expenses');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { createError } = require('../helpers/errors');
const HttpCodes = require('../constants/httpStatus');
const {
  formatError,
  formatFailure,
  formatValidationErrors
} = require('../helpers/responses');

const publicRoutes = {
  '/api/users': 'GET',
  '/api/users/login': 'POST',
  '/api/users/new': 'POST'
};

const sessionConfig = Object.assign({}, config.get('session'), {
  store: process.env.NODE_ENV === 'production' && config.get('app.ci') === false
    ? new RedisStore(config.get('redis'))
    : false
});

module.exports = function apiRoutes(express) {
  const router = express.Router();

  router.use(Raven.requestHandler());
  router.use(bodyParser.json());
  router.use(session(sessionConfig));

  /**
   * Middleware validating if we're trying to access public or private routes.
   * By default they are all private and you must whitelist them manually.
   */
  router.use((req, resp, next) => {
    if (typeof publicRoutes[req.originalUrl] !== 'undefined' && publicRoutes[req.originalUrl] === req.method) {
      return next();
    }

    if (req.session.user) {
      return next();
    }

    const error = createError('Valid credentials are required to access this ressource', 401);
    return next(error);
  });

  /**
   * Post request validator middleware.
   * On every POST, we're going to check if we have a payload in the body.
   * If we do, we move on. But if we don't we hand an error to the error middleware.
   */
  router.post('*', (req, resp, next) => {
    if (typeof req.body === 'undefined' || typeof req.body.payload === 'undefined') {
      const error = createError('Post requests require having a "payload" property in the post data', 422);
      return next(error);
    }

    return next();
  });

  router.use('/users', userRoutes(express));
  router.use('/categories', expenseCategoryRoutes(express));
  router.use('/expenses', expenseRoutes(express));

  /**
   * Last regular middleware defined.
   * If the request gets down here, means we've failed at matching the request before.
   * So we're assuming it doesn't exist and throw a 404.
   */
  router.use((req, resp, next) => {
    const error = createError('Ressource does not exist', 404);
    return next(error);
  });

  /**
   * Sentry error handler.
   * Will process them and make the error bubbles up to the other
   * error middlewares.
   */
  router.use(Raven.errorHandler());

  /**
   * Error middleware being executed every time the next() method is being called with
   * an error object in it. This will format a JSON response with a message and an error code.
   *
   * If we encounter a validation error, we'll dispatch it to the next error middleware.
   */
  router.use((error, req, resp, next) => {
    if (error instanceof DbConnection.Sequelize.ValidationError) {
      return next(error);
    }

    const status = error.status || 500;
    const response = formatError(error.message, status, resp.sentry);

    if (config.debug) {
      console.error(error.stack); // eslint-disable-line no-console
    }

    return resp.status(status).json(response);
  });

  /**
   * Validation error middleware.
   * Handles responses when a validation error has been encountered.
   * The only way to get in here is through the general error middleware (the first one).
   */
  router.use((error, req, resp, next) => { // eslint-disable-line no-unused-vars
    const status = HttpCodes.validationError;
    const formatted = formatValidationErrors(error.errors);
    const response = formatFailure(formatted);

    return resp.status(status).json(response);
  });

  return router;
};
