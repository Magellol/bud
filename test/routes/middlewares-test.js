const { wrap } = require('co');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const server = require('../../src/server');
const { getAuthedAgent } = require('../test-helpers');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Auth middleware', function () {
  it('Should return an error because we\'re trying to access a private route without creds.', function () {
    const request = chai.request(server)
      // Even if the route does not exist, we're doing the cred check in the middleware chain.
      // TODO change this route to be a private route when we have one.
      .post('/api/users/hello');

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(401);
        expect(body.status).to.be.equal('error');
        expect(body.code).to.be.equal(401);
        expect(body.message).to.be.equal('Valid credentials are required to access this ressource');
      });
  });

  it.skip('Should proceed the request if we have valid credentials', wrap(function* () {
    // We need a private route to test against and we don't have any so far...
  }));

  it('Should proceed the request without creds for a public url', wrap(function* () {
    const response = yield chai.request(server)
      .get('/api/users');

    expect(response).to.have.status(200);
    expect(response.body.status).to.be.equal('success');
  }));
});

describe('POST middleware', function () {
  it('Should return an error message when no payload is sent', function () {
    const request = chai.request(server).post('/api/users/new');

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(422);
        expect(body.status).to.be.equal('error');
        expect(body.message).to.be.equal('Post requests require having a "payload" property in the post data');
      });
  });
});

describe('404 middleware', function () {
  it('Should return an error response with a 404 code', wrap(function* () {
    const agent = yield getAuthedAgent();
    const request = agent.get('/api/hello/world');

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(404);
        expect(body.status).to.be.equal('error');
        expect(body.message).to.be.equal('Ressource does not exist');
      });
  }));
});
