const { wrap } = require('co');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const server = require('../../src/server');
const { Models } = require('../../src/server/models');
const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

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
  it('Should return an error response if we could not validate the new user (uniqueness)', wrap(function* () {
    const oneUser = yield Models.User.findOne({
      attributes: ['username']
    });

    const request = chai.request(server)
      .post('/api/users/new')
      .send({
        payload: {username: oneUser.get('username')}
      });

    return expect(request).to.be.rejected
      .then(error => {
        const { body } = error.response;

        expect(error.response).to.have.status(422);
        expect(body.status).to.be.equal('fail');
        expect(body.data).to.be.deep.equal({
          username: ['username must be unique']
        });
      });
  }));

  it.skip('Should return an error response if we could not validate the new user (validation error)', wrap(function *() {

  }));

  it.skip('Should create and return the new user in the response', function () {

  });
});
