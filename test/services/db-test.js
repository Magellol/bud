const { expect } = require('chai');
const Sequelize = require('sequelize');
const db = require('../../src/server/services/db');

describe('::Database', function () {
  it('Should export a Sequelize object', function () {
    expect(db).to.be.an.instanceof(Sequelize);
  });
});
