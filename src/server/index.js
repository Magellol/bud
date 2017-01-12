require('./config/bootstrap');

const config = require('config');
const express = require('express');
const apiRoutes = require('./routes');
const compression = require('compression');
const clientRoutes = require('../client/client-routes');

const App = express();

App.use(compression());
App.use('/api', apiRoutes(express));
App.use('/', clientRoutes(express));

const port = config.get('port');
App.listen(port, () => {
  if (config.debug) {
    console.log(`Listening at ${port}`); // eslint-disable-line no-console
  }
});

module.exports = App;
