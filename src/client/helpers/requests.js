/**
 * Request a endpoint.
 * @param  {string} endpoint Url to query.
 * @param  {object} options  Options to pass it to fetch().
 * @return {Promise}         Promise that fullfils into a json response.
 */
function request(endpoint, options) {
  return fetch(endpoint, options).then(response => response.json());
}

/**
 * Shorthanded method to do a post requests to the api.
 * @param  {string} endpoint  Url to query.
 * @param  {Object} [body={}] body to send.
 * @return {Promise}          Promise that fullfils into a json response.
 */
export function post(endpoint, body = {}) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ payload: body })
  };

  return request(endpoint, options);
}

export function get(endpoint) {
  const options = { method: 'GET' };

  return request(endpoint, options);
}
