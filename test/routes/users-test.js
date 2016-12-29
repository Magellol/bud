const { wrap } = require('co');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server');
const { Models } = require('../../src/server/models');
const { expect } = chai;

chai.use(chaiHttp);

describe('/users', function () {
  it('Should return a list of all users', wrap(function* () {
    const allUsers = yield Models.User.findAll({
      attributes: ['id']
    });

    const { body } = yield chai.request(server).get('/api/users');

    expect(body.data.length).to.be.equal(allUsers.length);
  }));
});

describe('/users/new', function () {
  it.skip('Should return an error response if we could not validate the new user', function () {

  });

  it.skip('Should create and return the new user in the response', function () {

  });
});
