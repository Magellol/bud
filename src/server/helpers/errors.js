const { connection } = require('../models');

function createValidationError(field, message) {
  const error = new connection.Sequelize.ValidationError();
  error.errors = [{
    path: field,
    message
  }];

  return error;
}

module.exports = {
  createValidationError
};
