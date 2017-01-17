const RESPONSE_STATUSES = {
  ok: 'success',
  failure: 'fail',
  error: 'error'
};

function format(status, data) {
  return {
    status,
    data
  };
}

function formatValidationErrors(errors = []) {
  return errors.reduce((formatted, error) => {
    const fieldname = error.path;

    return Object.assign({}, formatted, {
      [fieldname]: formatted[fieldname] ? [...formatted[fieldname], error.message] : [error.message]
    });
  }, {});
}

function formatSuccess(data = null) {
  return format(RESPONSE_STATUSES.ok, data);
}

function formatFailure(data = null) {
  return format(RESPONSE_STATUSES.failure, data);
}

function formatError(message, code = null, id = null) {
  if (typeof message !== 'string') {
    throw new Error(
      'Could not format an error message. ' +
      `The "message" argument must be a string. "${typeof message}" was given instead.`
    );
  }

  if (message.trim().length === 0) {
    throw new Error(
      'Could not format an error message. ' +
      'The "message" argument was empty.'
    );
  }

  const error = {
    message: message.trim(),
    status: RESPONSE_STATUSES.error
  };

  if (code !== null) {
    error.code = code;
  }

  if (id !== null) {
    error.id = id;
  }

  return error;
}

module.exports = {
  formatFailure,
  formatError,
  formatSuccess,
  formatValidationErrors
};
