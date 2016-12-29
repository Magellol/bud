const Sequelize = require('sequelize');
const config = require('config');

module.exports = new Sequelize(
  config.get('datasource.database'),
  config.get('datasource.username'),
  config.get('datasource.password'),
  {
    dialect: config.get('datasource.dialect'),
    host: config.get('datasource.host'),
    logging: config.get('debug') ? console.log : false,
    benchmark: config.get('debug') === true,
    timezone: 'America/New_York',
    pool: {
      max: 5,
      min: 0
    }
  }
);
