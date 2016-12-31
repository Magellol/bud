/**
 * Development app configuration.
 * It will inherit and optionnaly override values from `./default.js`
 */
module.exports = {
  debug: true,
  session: {
    store: false // Will fallback to the default (MemoryStore)
  }
};
