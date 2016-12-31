const co = require('co');
const server = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Models } = require('../src/server/models');

chai.use(chaiHttp);

/**
 * Get an authed agent, to test against the private server routes.
 * @return {Promise} fulfill with the authed agent object.
 */
function getAuthedAgent(userId = 1) {
  return co(function* () {
    const user = yield Models.User.findOne({
      where: { id: userId },
      attributes: ['id', 'username']
    });

    const agent = chai.request.agent(server);

    yield agent.post('/api/users/login').send({
      payload: { username: user.get('username') }
    });

    return agent;
  });
}

module.exports = {
  getAuthedAgent
};
