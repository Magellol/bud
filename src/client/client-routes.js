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
const fs = require('fs');

function getLayout(variables = {}) {
  const location = path.join(__dirname, 'index.html');
  const file = fs.readFileSync(location, 'utf8');

  return Object.keys(variables).reduce((html, variable) => {
    const tag = `#${variable}#`;
    const regex = new RegExp(tag, 'g');
    return html.replace(regex, variables[variable]);
  }, file);
}

module.exports = function clientRoutes(express) {
  const router = express.Router();

  router.use(express.static('public'));

  router.get('/', (req, resp) => (
    resp.send(getLayout())
  ));

  return router;
};
