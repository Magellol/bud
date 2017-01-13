const { getComponentOr404 } = require('../../helpers/auth.js');

module.exports = {
  path: '/dashboard',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const baseComponent = require('./components/Dashboard').default;
      return getComponentOr404(baseComponent)
        .then(component => callback(null, component));
    });
  }
};
