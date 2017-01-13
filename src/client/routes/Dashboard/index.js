module.exports = {
  path: '/dashboard',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('./components/Dashboard').default);
    });
  }
};
