const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server');
const { expect } = chai;

chai.use(chaiHttp);

describe('POST middleware', function () {
  it('Should return an error message when no payload is sent', function () {
    return chai.request(server)
      .post('/api/users/test')
      .catch(error => {
        const body = error.response.body;

        expect(error.status).to.be.equal(422);
        expect(body.status).to.be.equal('error');
        expect(body.message).to.be.equal(
          'Post requests require having a "payload" property in the post data'
        );
      });
  });
});

describe('404 middleware', function () {
  it('Should return an error response with a 404 code', function () {
    return chai.request(server)
      .get('/api/hello/world')
      .catch(error => {
        const body = error.response.body;

        expect(error.status).to.be.equal(404);
        expect(body.status).to.be.equal('error');
        expect(body.message).to.be.equal('Ressource does not exist');
      });
  });
});
