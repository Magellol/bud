import NotFoundError from '../components/NotFoundError';

/**
 * Returns the passed in component if the current users
 * is allowed to see it, otherwise returns a NotFoundError
 */
// eslint-disable-next-line import/prefer-default-export
export function getComponentOr404(Component) {
  return fetch('/api/users/me', {
    credentials: 'same-origin'
  }).then((response) => {
    if (response.status === 200) {
      return Component;
    }

    return NotFoundError;
  }).catch(() => NotFoundError);
}
