/* eslint-disable global-require */
const { getComponentOr404 } = require('../../../../helpers/auth');

module.exports = {
  path: ':categoryId/:expenseId',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const baseComponent = require('./components/SingleExpense').default;
      return getComponentOr404(baseComponent)
        .then(component => callback(null, component));
    });
  }
};
