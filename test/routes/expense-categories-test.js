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
