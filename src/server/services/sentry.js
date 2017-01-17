const config = require('config');
const Raven = require('raven');

if (config.debug === false) {
  Raven.disableConsoleAlerts();
}

Raven.config(config.sentry.DSN).install();

module.exports = Raven;
