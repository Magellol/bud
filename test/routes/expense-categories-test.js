const { wrap } = require('co');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Models } = require('../../src/server/models');
const { getAuthedAgent } = require('../test-helpers');

const { expect } = chai;

chai.use(chaiHttp);

describe('/categories', function () {
  it('Should return a list of categories', wrap(function* () {
    const userId = 1;
    const validCategories = yield Models.ExpenseCategory.findAll({
      attributes: ['id'],
      where: { userId }
    });

    const agent = yield getAuthedAgent(userId);
    const response = yield agent.get('/api/categories');
    const { body } = response;

    expect(response).to.have.status(200);
    expect(body.status).to.be.equal('success');
    expect(body.data.length).to.be.equal(validCategories.length);
  }));
});

describe('/categories/new', function () {
  it('Should return an error response when it does not validate', wrap(function* () {
    const user = 1;
    const agent = yield getAuthedAgent(user);

    const request = agent
      .post('/api/categories/new')
      .send({
        payload: { name: false }
      });

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;
        expect(error.response).to.have.status(422);
        expect(body.status).to.be.equal('fail');
        expect(body.data).to.be.deep.equal({
          name: ['The name must be a string']
        });
      });
  }));

  it('Should create a new category', wrap(function* () {
    const user = 1;
    const agent = yield getAuthedAgent(user);
    const response = yield agent
      .post('/api/categories/new')
      .send({
        payload: { name: 'My new category' }
      });

    const { body } = response;
    const { UserId, name } = body.data;

    expect(response).to.have.status(200);
    expect(body.status).to.be.equal('success');
    expect({ UserId, name }).to.be.deep.equal({
      name: 'My new category',
      UserId: user
    });
  }));
});
