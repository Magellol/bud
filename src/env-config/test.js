/**
 * Test app configuration.
 * This configuration will only be used when tests are being ran on a local machine.
 * The CI will be in production mode, all the time.
 */
module.exports = {
  debug: true,
  datasource: {
    database: process.env.DATASOURCE_TEST_DATABASE
  }
};
