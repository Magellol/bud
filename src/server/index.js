require('./config/bootstrap');

const config = require('config');
const express = require('express');
const api = require('./routes/api');

const App = express();

App.use('/api', api(express));

const port = config.get('port');
App.listen(port, () => {
  if (config.debug) {
    console.log(`Listening at ${port}`)
  }
});

module.exports = App;
