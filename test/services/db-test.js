const { expect } = require('chai');
const db = require('../../src/server/services/db');
const { connection } = require('../../src/server/models');

describe('Database', function () {
  it('Should export an instance of Sequelize', function () {
    expect(db).to.be.an.instanceof(connection.Sequelize);
  });
});
