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

function formatSuccess(data = null) {
  return format(RESPONSE_STATUSES.ok, data);
}

function formatFailure(data = null) {
  return format(RESPONSE_STATUSES.failure, data);
}

function formatError(message, code = null) {
  if (typeof message !== 'string') {
    throw new Error(
      `Could not format an error message. ` +
      `The "message" argument must be a string. "${typeof message}" was given instead.`
    );
  }

  message = message.trim();
  if (message.length === 0) {
    throw new Error(
      `Could not format an error message. ` +
      `The "message" argument was empty.`
    );
  }

  const error = {
    message,
    status: RESPONSE_STATUSES.error
  };

  if (code !== null) {
    error.code = code;
  }

  return error;
}

module.exports = {
  formatFailure,
  formatError,
  formatSuccess
};
