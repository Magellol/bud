require('../src/server/config/bootstrap');

const Sequelize = require('sequelize');
const { Models, connection } = require('../src/server/models');
const fixtures = require('./fixtures');

describe('Unit tests', function() {
  require('./services');
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
    function executeTransation(transaction) {
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
        return model.bulkCreate(currentFixtures, { transaction });
      });

      return Promise.all(fixturized);
    }

    return connection.transaction({
      deferrable: Sequelize.Deferrable.SET_DEFERRED
    }, executeTransation);
  });
});
