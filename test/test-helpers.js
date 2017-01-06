const co = require('co');
const server = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Models } = require('../src/server/models');

const { expect } = chai;

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

function testModelValidation(tests, { model, defaultFields, fieldToTest }) {
  const promises = tests.map((test) => {
    const fields = Object.assign({}, defaultFields, {
      [fieldToTest]: test[0]
    });

    const object = model.build(fields);

    return object.validate();
  });

  return Promise.all(promises)
    .then((listOfErrors) => {
       // If null means it passes validation.
      expect(listOfErrors).to.not.include(null, 'Passed validation');

      const messages = listOfErrors.map(error => error.errors[0].message);
      const expectedMessages = tests.map(test => test[1]);

      expect(messages).to.be.deep.equal(expectedMessages);
    });
}

module.exports = {
  getAuthedAgent,
  testModelValidation
};
