const { connection } = require('../models');

function createValidationError(field, message) {
  const error = new connection.Sequelize.ValidationError();
  error.errors = [{
    path: field,
    message
  }];

  return error;
}

function createError(message, status = 500) {
  const error = new Error(message);
  error.status = status;

  return error;
}

module.exports = {
  createError,
  createValidationError
};
