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
          ExpenseCategoryId: [
            'The category associated to the expense does not exist. ' +
            'Therefore the expense could not be added. It requires a valid category.'
          ]
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
});
