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
    port: process.env.DATASOURCE_PORT,
    dialect: 'mysql'
  },
  session: {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: (2 * 86400000) // 2 days.
    }
  },
  sentry: {
    DSN: process.env.SENTRY_DSN
  },
  app: {
    host: process.env.APP_HOST
  },
  redis: {
    url: process.env.REDIS_URL
  }
};
