import NotFoundError from '../components/NotFoundError';

/**
 * Load the given component if the current user session is allowed
 * to access it.
 */
// eslint-disable-next-line import/prefer-default-export
export function loadIfAuthorized(Component, routeCallback) {
  fetch('/api/users/me', {
    credentials: 'same-origin'
  }).then((response) => {
    if (response.status === 200) {
      return routeCallback(null, Component);
    }

    return routeCallback(null, NotFoundError);
  });
}
