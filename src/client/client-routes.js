/**
 * Cient routes.
 * Client routes are express routes that are client facing.
 * Means, the browser requests them directly, they are URLs basically.
 *
 * React-router will take over the rendering phase (no SSR)
 * but we still need to tell express to send the whole HTML to the browser so react takes over.
 *
 * If we ever need to split this app into two repos (client, server)
 * then this file must be taken out and act as the mini server for the client code.
 *
 * It is currently being required in the main express instance in `server/index.js`.
 */
const path = require('path');
const config = require('config');
const request = require('request');
const fs = require('fs');
// Ideally I would not use something belonging to the server code...
const { createError } = require('../server/helpers/errors');

function getLayout(variables = {}) {
  const location = path.join(__dirname, 'index.html');
  const file = fs.readFileSync(location, 'utf8');
  const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'assets.json'), 'utf8'));

  const allVariables = Object.assign({}, variables, {
    CSS_PATH: `/${assets.main.css}` || null,
    JS_PATH: `/${assets.main.js}`
  });

  return Object.keys(allVariables).reduce((html, variable) => {
    const tag = `#${variable}#`;
    const regex = new RegExp(tag, 'g');
    return html.replace(regex, allVariables[variable]);
  }, file);
}

module.exports = function clientRoutes(express) {
  const router = express.Router();

  router.use(express.static('public'));

  router.get('/', (req, resp) => (
    resp.send(getLayout())
  ));

  /**
   * Make these routes private because only a logged in user should have access.
   * In order to do that, we're going to make an api call on server page loading
   * to see if the users is set.
   *
   * Further more each React route that are private will query their own server route
   * and handle the response as well.
   *
   * TODO
   * So this isn't great, especially with how we tell React router
   * to display proper routes based on the authentification.
   * We basically query twice the same url when we do server side loading.
   */
  router.get([
    '/dashboard',
    '/monthly/:year/:month',
    '/monthly/:year/:month/:categoryId',
    '/monthly/:year/:month/:categoryId/:expenseId',
  ], (req, resp, next) => {
    const url = `${config.get('app.host')}/api/users/me`;

    const toPipe = request(url, function (error, response) {
      if (error || response.statusCode !== 200) {
        return next(createError('Ressource does not exist', 404));
      }

      return resp.send(getLayout());
    });

    req.pipe(toPipe);
  });

  // 404 middleware
  router.use((req, resp, next) => {
    const errorResponse = createError('Ressource does not exist', 404);
    return next(errorResponse);
  });

  /**
   * Error middleware for client facing routes
   */
  router.use((error, req, resp, next) => { // eslint-disable-line no-unused-vars
    const status = error.status || 500;

    if (config.debug) {
      console.error(error.stack); // eslint-disable-line no-console
    }

    // Tells react to display something for the error.
    return resp.status(status).send(getLayout());
  });

  return router;
};
