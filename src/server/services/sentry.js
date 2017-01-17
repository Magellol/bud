const config = require('config');
const Raven = require('raven');

Raven.config(config.sentry.DSN).install();

module.exports = Raven;
