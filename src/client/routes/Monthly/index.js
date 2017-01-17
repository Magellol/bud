/* eslint-disable global-require */
const { getComponentOr404 } = require('../../helpers/auth.js');

module.exports = {
  path: 'monthly/:year/:month',
  getIndexRoute(partialNextState, callback) {
    require.ensure([], (require) => {
      const baseComponent = require('./components/Monthly').default;
      return getComponentOr404(baseComponent)
        .then(component => callback(null, { component }));
    });
  },
  childRoutes: [
    require('./routes/SingleCategory'),
    require('./routes/SingleExpense')
  ]
};
