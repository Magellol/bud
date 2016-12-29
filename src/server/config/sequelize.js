/**
 * Config file for sequelized migrations.
 */

// TODO
// This is not pretty but I have to figure out a way to pass 'development' as env
// when on a local machine without hardcoding it.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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
