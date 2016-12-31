require('../src/server/config/bootstrap');

const Sequelize = require('sequelize');
const { Models, connection } = require('../src/server/models');
const fixtures = require('./fixtures');

describe('Unit tests', function() {
  require('./services');
  require('./models');
  require('./helpers');
});

describe('Integration tests', function () {

  /**
   * Before running this test suite, we're going to drop the DB schema and
   * create it again. This will drop any previous tables/rows.
   */
  before('Setting up the test DB', function () {
    return connection.sync({force: true});
  });

  /**
   * Before each tests, we're going to populate the DB to reset the fixtures.
   * This avoids having weird leftover data through tests, they're supposed to be isolated.
   *
   * Once it's done, we'll tell Mocha to start the tests
   */
  beforeEach('Inserting fixtures', function () {
    return connection.transaction(transaction => {

      const fixturized = Object.keys(fixtures).map(modelName => {
        const model = Models[modelName];

        if (typeof model === 'undefined') {
          throw new Error(
            `"${modelName}" is not a valid model. ` +
            `Fixture properties must match actual model name (often the singular version). ` +
            `Valid model names are "${Object.keys(Models).join('", "')}".`
          );
        }

        const currentFixtures = fixtures[modelName];

        return connection.query('SET FOREIGN_KEY_CHECKS=0;', { transaction })
        .then(() => model.truncate({ cascade: true, transaction }))
        .then(() => model.bulkCreate(currentFixtures, { transaction }))
        .then(() => connection.query('SET FOREIGN_KEY_CHECKS=1;', { transaction }));
      });

      return Promise.all(fixturized);
    });
  });

  require('./routes');
});
