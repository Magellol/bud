const config = require('config');
const Raven = require('raven');

if (process.env.NODE_ENV === 'production' && config.has('sentry.DSN') === false) {
  throw new Error(
    'Invalid Sentry DSN url string. ' +
    'Production environments require having sentry set up through the SENTRY_DSN env variable. ' +
    'If you don\'t have sentry yet, please visit: https://sentry.io — They have a free tier. It will keep you sane.'
  );
}

if (config.debug === false) {
  Raven.disableConsoleAlerts();
}

Raven.config(config.sentry.DSN).install();

module.exports = Raven;
