/**
 * Main Db connection.
 * An object will be returned from this module and should always be used when dealing with the database.
 */

const Sequelize = require('sequelize');
const config = require('config').datasource;

module.exports = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0
  }
});
