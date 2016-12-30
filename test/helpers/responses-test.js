const { expect } = require('chai');
const {
  formatSuccess,
  formatFailure,
  formatError,
  formatValidationErrors
} = require('../../src/server/helpers/responses');

describe('formatValidationErrors', function () {
  it('Should return an object of formatted errors', function () {
    const errors = [
      {
        path: 'username',
        message: 'Cannot be empty'
      },
      {
        path: 'username',
        message: 'Must be 3 characters long'
      },
      {
        path: 'password',
        message: 'Cannot be empty'
      }
    ];

    const result = formatValidationErrors(errors);

    expect(result).to.be.deep.equal({
      username: ['Cannot be empty', 'Must be 3 characters long'],
      password: ['Cannot be empty']
    });
  });
});

describe('formatSuccess', function () {
  it('Should return an object with the status "success" and some data', function () {
    const result = formatSuccess({
      foo: 'bar'
    });

    expect(result).to.be.deep.equal({
      status: 'success',
      data: {
        foo: 'bar'
      }
    });
  });

  it('Should return an object with an empty data property.', function () {
    const result = formatSuccess();

    expect(result).to.be.deep.equal({
      status: 'success',
      data: null
    });
  });
});

describe('formatFailure', function () {
  it('Should return an object with the status "fail" and some data', function () {
    const result = formatFailure({
      foo: 'bar'
    });

    expect(result).to.be.deep.equal({
      status: 'fail',
      data: {
        foo: 'bar'
      }
    });

  });

  it('Should return an object with the status "fail" and no data.', function () {
    const result = formatFailure();

    expect(result).to.be.deep.equal({
      status: 'fail',
      data: null
    });
  })
});

describe('formatError', function() {
  it('Should throw an error when the first argument passed in is not a string.', function () {
    expect(() => formatError(true)).to.throw(
      Error,
      `Could not format an error message. ` +
      `The "message" argument must be a string. "boolean" was given instead.`
    );
  });

  it('Should throw an error if the message argument is an empty string', function () {
    expect(() => formatError('')).to.throw(
      Error,
      `Could not format an error message. ` +
      `The "message" argument was empty.`
    );
  });

  it('Should return an object with the message passed in and no code', function () {
    const result = formatError('My awesome error');

    expect(result).to.be.deep.equal({
      status: 'error',
      message: 'My awesome error'
    });
  });

  it('Should return an object with a passed in code', function () {
    const result = formatError('My awesome error', 123);

    expect(result).to.be.deep.equal({
      status: 'error',
      message: 'My awesome error',
      code: 123
    });
  });
});
