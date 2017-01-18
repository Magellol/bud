const { wrap } = require('co');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const { Models } = require('../../src/server/models');
const { getAuthedAgent } = require('../test-helpers');
const HttpCodes = require('../../src/server/constants/httpStatus');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('/expenses/new', function () {
  it('Should reject the request when the category is not valid', wrap(function* () {
    const userId = 1;
    const agent = yield getAuthedAgent(userId);

    const request = agent.post('/api/expenses/new')
      .send({
        payload: { ExpenseCategoryId: 2 }
      });

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(HttpCodes.validationError);
        expect(body.status).to.be.equal('fail');
        expect(body.data).to.be.deep.equal({
          ExpenseCategoryId: ['An expense must be associated to a category']
        });
      });
  }));

  it('Should reject the request if validation fails', wrap(function* () {
    const userId = 1;
    const agent = yield getAuthedAgent(userId);

    const request = agent.post('/api/expenses/new')
      .send({
        payload: { ExpenseCategoryId: 1, amount: '0', name: '' }
      });

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;
        expect(error.response).to.have.status(HttpCodes.validationError);
        expect(body.status).to.be.equal('fail');
        expect(body.data).to.be.deep.equal({
          amount: ['Your amount cannot be less than one cent'],
          name: ['You must provide a name', 'The name can only include letters, numbers and spaces', 'The expense name must be between 3 and 30 characters long']
        });
      });
  }));

  it('Should create a new expense when requested', wrap(function* () {
    const userId = 1;
    const agent = yield getAuthedAgent(userId);
    const category = yield Models.ExpenseCategory.findOne({
      where: { UserId: userId }
    });

    const response = yield agent.post('/api/expenses/new')
      .send({
        payload: { ExpenseCategoryId: category.get('id'), amount: '57.67', name: 'M-y super\' awesome expense' }
      });

    const { body } = response;
    expect(response).to.have.status(HttpCodes.allGood);

    expect(body.status).to.be.equal('success');
    expect(body.data.ExpenseCategoryId).to.be.equal(category.get('id'));
    expect(body.data.amount).to.be.equal('57.67');
    expect(body.data.name).to.be.equal('M-y super\' awesome expense');
  }));
});

describe('/expenses/:id', function () {
  it('Should return an error response when trying to display an expense that does not belong to the user', wrap(function* () {
    const agent = yield getAuthedAgent(1);
    const request = agent.get('/api/expenses/8');

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(HttpCodes.notFound);
        expect(body.status).to.be.equal('error');
        expect(body.message).to.be.equal('This expense does not exist');
      });
  }));

  it('Should return an expense object with its category included', wrap(function* () {
    const agent = yield getAuthedAgent(1);
    const response = yield agent.get('/api/expenses/1');

    const { status } = response.body;
    const { id, ExpenseCategory } = response.body.data;

    expect(response).to.have.status(200);
    expect(status).to.be.equal('success');
    expect(id).to.be.equal(1);
    expect(ExpenseCategory.id).to.be.equal(1);
  }));
});

describe('/expenses/monthly', function () {
  it('Should throw an error when an invalid year is passed', wrap(function* () {
    const userId = 1;
    const agent = yield getAuthedAgent(userId);

    const request = agent.get('/api/expenses/monthly/123/January');

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(HttpCodes.validationError);
        expect(body.status).to.be.equal('fail');
        expect(body.data).to.be.deep.equal({
          ':year': ['Invalid ":year" param passed when viewing monthly expenses']
        });
      });
  }));

  it('Should throw an error when an invalid month is passed', wrap(function* () {
    const userId = 1;
    const agent = yield getAuthedAgent(userId);

    const request = agent.get('/api/expenses/monthly/2017/Nyan');

    return expect(request).to.be.rejected
      .then((error) => {
        const { body } = error.response;

        expect(error.response).to.have.status(HttpCodes.validationError);
        expect(body.status).to.be.equal('fail');
        expect(body.data).to.be.deep.equal({
          ':month': ['Invalid ":month" param passed when viewing monthly expenses']
        });
      });
  }));

  it('Should get all categories and expenses for the given month', wrap(function* () {
    const userId = 1;
    const agent = yield getAuthedAgent(userId);

    const response = yield agent.get('/api/expenses/monthly/1980/january');
    const { body } = response;

    expect(response).to.have.status(HttpCodes.allGood);
    expect(body.status).to.be.equal('success');

    expect(body.data.length).to.be.equal(2);
    expect(body.data[0].id).to.be.equal(3);
    expect(body.data[1].id).to.be.equal(4);
  }));
});

describe('/expenses/update', function () {
  it('Should error out when the expense does not exist or belong to the user', wrap(function* () {
    const loggedInUserId = 1;
    const agent = yield getAuthedAgent(loggedInUserId);

    const request = agent.post('/api/expenses/update')
      .send({
        payload: { id: 8 }
      });

    return expect(request).to.be.rejected
      .then((error) => {
        expect(error.response).to.have.status(HttpCodes.notFound);
        expect(error.response.body.status).to.be.equal('error');
        expect(error.response.body.message).to.be.equal('This expense does not exist');
      });
  }));

  it('Should error out when the new category does not exists or belong to the user', wrap(function* () {
    const loggedInUserId = 1;
    const agent = yield getAuthedAgent(loggedInUserId);

    const request = agent.post('/api/expenses/update')
      .send({
        payload: { id: 1, ExpenseCategoryId: 2 }
      });

    return expect(request).to.be.rejected
      .then((error) => {
        expect(error.response).to.have.status(HttpCodes.notFound);
        expect(error.response.body.status).to.be.equal('error');
        expect(error.response.body.message).to.be.equal('The updated category does not exist');
      });
  }));

  it('Should set the new category for the passed in Expense id', wrap(function* () {
    const loggedInUserId = 1;
    const agent = yield getAuthedAgent(loggedInUserId);

    const expense = yield Models.Expense.findOne({
      attributes: ['id', 'ExpenseCategoryId'],
      where: { ExpenseCategoryId: 1 }
    });

    const newCategory = yield Models.ExpenseCategory.findOne({
      attributes: ['id'],
      where: {
        UserId: loggedInUserId,
        id: {
          $ne: 1
        }
      }
    });

    const request = yield agent.post('/api/expenses/update')
      .send({
        payload: { id: expense.get('id'), ExpenseCategoryId: newCategory.get('id') }
      });

    const updatedExpense = yield Models.Expense.findById(expense.get('id'));

    expect(request).to.have.status(200);
    expect(request.body.status).to.be.equal('success');
    expect(request.body.data).to.be.equal(null);
    expect(updatedExpense.get('ExpenseCategoryId')).to.be.equal(newCategory.get('id'));
  }));
});

describe('/expenses/delete', function () {
  it('Should error out if we\'re trying to delete an expense that does not belong to the current user', wrap(function* () {
    const loggedInUserId = 1;
    const agent = yield getAuthedAgent(loggedInUserId);

    const request = agent.post('/api/expenses/delete')
      .send({
        payload: { id: 8 }
      });

    return expect(request).to.be.rejected
      .then((error) => {
        expect(error.response).to.have.status(404);
        expect(error.response.body.message).to.be.equal('Expense with id: "8" does not exist');
      });
  }));

  it('Should delete the expense from the surface of earth', wrap(function* () {
    const loggedInUserId = 1;
    const agent = yield getAuthedAgent(loggedInUserId);

    const response = yield agent.post('/api/expenses/delete')
      .send({
        payload: { id: 1 }
      });

    const deletedExpense = yield Models.Expense.findById(1);

    expect(response).to.have.status(200);
    expect(response.body.status).to.be.equal('success');
    expect(response.body.data).to.be.equal(null);
    expect(deletedExpense).to.be.equal(null);
  }));
});
