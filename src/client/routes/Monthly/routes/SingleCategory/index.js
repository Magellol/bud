/* eslint-disable global-require */
const { getComponentOr404 } = require('../../../../helpers/auth');

module.exports = {
  path: ':id',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const baseComponent = require('./components/SingleCategory').default;
      return getComponentOr404(baseComponent)
        .then(component => callback(null, component));
    });
  }
};
