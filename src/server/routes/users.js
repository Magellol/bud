module.exports = function(router) {

  router.post('/test', (req, resp, next) => {
    resp.send('hey');
  });

  return router;
};
