require('./config/bootstrap');

const config = require('config');
const express = require('express');

const App = express();

const port = config.get('port');
App.listen(port, () => console.log(`Listening at ${port}`));
