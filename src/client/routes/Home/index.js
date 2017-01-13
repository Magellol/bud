module.exports = {
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('./components/Home').default);
    });
  }
};
