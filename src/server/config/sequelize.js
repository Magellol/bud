/**
 * Config file for sequelized migrations.
 */
process.env.NODE_ENV = 'development'; // TODO temporary workaround.

require('./bootstrap');

const connection = require('../services/db');

module.exports = {
  username: connection.config.username,
  password: connection.config.password,
  database: connection.config.database,
  host: connection.options.host,
  dialect: connection.options.dialect,
  migrationStorageTableName: 'Migrations'
};
