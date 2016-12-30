/**
 * Production app configuration.
 * This is the default configuration file, thus the one used in production.
 */
module.exports = {
  debug: false,
  port: process.env.PORT,
  datasource: {
    database: process.env.DATASOURCE_DATABASE,
    host: process.env.DATASOURCE_HOST,
    username: process.env.DATASOURCE_USERNAME,
    password: process.env.DATASOURCE_PASSWORD,
    dialect: 'mysql'
  }
};
