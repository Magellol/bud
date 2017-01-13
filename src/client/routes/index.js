/* eslint-disable global-require */

module.exports = {
  path: '/',
  component: require('../components/App').default,
  indexRoute: require('./Home'),
  childRoutes: [
    require('./Dashboard'),
    require('./Monthly'),
    { path: '*', component: require('../components/NotFoundError').default }
  ]
};
