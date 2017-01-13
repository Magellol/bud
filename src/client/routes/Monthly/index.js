module.exports = {
  path: '/monthly/:year/:month',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('./components/Monthly').default);
    });
  }
};
