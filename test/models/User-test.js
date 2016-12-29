const { expect } = require('chai');
const { connection, Models } = require('../../src/server/models');
const User = require('../../src/server/models/User');

const { Sequelize } = connection;

describe('User', function () {
  it('Should export an instance of Model', function () {
    const result = User(connection, Sequelize.DataTypes);

    expect(result).to.be.an.instanceof(Sequelize.Model);
  });

  it('Should associate User', function () {
    const result = User(connection, Sequelize.DataTypes);
    result.associate(Models);

    const assoc = result.associations;

    expect(Object.values(assoc).length).to.be.equal(1);
    expect(assoc.ExpenseCategories).to.be.an.instanceof(Sequelize.Association.HasMany);
  });
});
