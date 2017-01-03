export function ucfirst(string) { // eslint-disable-line import/prefer-default-export
  const type = typeof string;

  if (type !== 'string') {
    throw new Error(
      'ucfirst() can only work with strings directly. ' +
      `Received ${type} instead.`
    );
  }

  return string[0].toUpperCase() + string.slice(1);
}
