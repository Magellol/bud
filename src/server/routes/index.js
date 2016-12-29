const config = require('config');
const bodyParser = require('body-parser');
const users = require('./users');
const {
  formatError
} = require('../helpers/responses');

module.exports = function apiRoutes(express) {
  const router = express.Router();

  router.use(bodyParser.json());

  /**
   * Post request validator middleware.
   * On every POST, we're going to check if we have a payload in the body.
   * If we do, we move on. But if we don't we hand an error to the error middleware.
   */
  router.post('*', (req, resp, next) => {
      if (typeof req.body === 'undefined' || typeof req.body.payload === 'undefined') {

        // TODO
        // Use helper.
        const error = new Error('Post requests require having a "payload" property in the post data');
        error.status = 422;

        return next(error);
      }

      return next();
  });

  router.use('/users', users(router));

  /**
   * Last regular middleware defined.
   * If the request gets down here, means we've failed at matching the request before.
   * So we're assuming it doesn't exist and throw a 404.
   */
  router.use((req, resp, next) => {

    // TODO
    // Helper.
    const error = new Error('Ressource does not exist');
    error.status = 404;
    return next(error);
  });

  /**
   * Error middleware being executed every time the next() method is being called with
   * an error object in it. This will format a JSON response with a message and an error code.
   */
  router.use((error, req, resp, next) => {
    const status = error.status || 500;
    const response = formatError(error.message, status);

    if (config.debug) {
      console.error(error.stack);
    }

    return resp.status(status).json(response);
  });

  return router;
};
