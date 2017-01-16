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

describe('/categories/:year/:month/:id', function () {
  it('Should return an error when we try to get a category that does not belong to the logged in user', wrap(function* () {
    const loggedInUserId = 1;
    const agent = yield getAuthedAgent(loggedInUserId);

    const request = agent.get('/api/categories/2017/january/2');

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(404);
        expect(body.status).to.be.equal('error');
        expect(body.message).to.be.equal('The requested category does not exist');
      });
  }));

  it('Should return the requested category + its monthly expenses', wrap(function* () {
    const loggedInUserId = 1;
    const agent = yield getAuthedAgent(loggedInUserId);

    const { body } = yield agent.get('/api/categories/1980/january/3');
    const expectedIds = [3, 7];
    const expenseIds = body.data.Expenses.map(expense => expense.id);

    expect(body.status).to.be.equal('success');
    expect(expenseIds).to.be.deep.equal(expectedIds);
  }));
});
