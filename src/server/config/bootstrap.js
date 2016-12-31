const validEnvironments = ['development', 'production', 'test'];

// Make it quick failing in case we're running this on a weird env.
if (validEnvironments.includes(process.env.NODE_ENV) === false) {
  throw new Error(
    'Server failed at boostrap. ' +
    `"${process.env.NODE_ENV}" is not a valid running environment. ` +
    `Accepted values are "${validEnvironments.join('", "')}".`
  );
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('dotenv').config();
}
