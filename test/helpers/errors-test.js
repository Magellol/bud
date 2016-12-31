const { expect } = require('chai');
const { connection } = require('../../src/server/models');
const {
  createValidationError,
  createError
} = require('../../src/server/helpers/errors');

describe('createValidationError', function () {
  it('Should return a validationError object with errors set', function () {
    const result = createValidationError('face', 'too ugly');

    expect(result).to.be.an.instanceOf(connection.Sequelize.ValidationError);
    expect(result.errors).to.be.deep.equal([
      {
        path: 'face',
        message: 'too ugly'
      }
    ]);
  });
});

describe('createError', function () {
  it('Should return an error object with a default error status', function () {
    const result = createError('custom message');

    expect(result).to.be.an.instanceOf(Error);
    expect(result.message).to.be.equal('custom message');
    expect(result.status).to.be.equal(500);
  });

  it('Should return an error object with a set error status', function () {
    const result = createError('custom message', 111);

    expect(result).to.be.an.instanceOf(Error);
    expect(result.message).to.be.equal('custom message');
    expect(result.status).to.be.equal(111);
  });
});
