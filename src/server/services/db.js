const Sequelize = require('sequelize');
const config = require('config').datasource;

module.exports = new Sequelize(
  config.get('database'),
  config.get('username'),
  config.get('password'),
  {
    dialect: config.get('dialect'),
    host: config.get('host'),
    define: {
      underscored: true
    },
    pool: {
      max: 5,
      min: 0
    }
  }
);
