const { expect } = require('chai');
const { connection, Models } = require('../../src/server/models');
const ExpenseCategory = require('../../src/server/models/ExpenseCategory');

const { Sequelize } = connection;

describe('ExpenseCategory', function () {
  it('Should export an instance of Model', function () {
    const result = ExpenseCategory(connection, Sequelize.DataTypes);

    expect(result).to.be.an.instanceof(Sequelize.Model);
  });

  it('Should associate ExpenseCategory', function () {
    const result = ExpenseCategory(connection, Sequelize.DataTypes);
    result.associate(Models);

    const assoc = result.associations;

    expect(Object.values(assoc).length).to.be.equal(2);
    expect(assoc.Expenses).to.be.an.instanceof(Sequelize.Association.HasMany);
    expect(assoc.User).to.be.an.instanceof(Sequelize.Association.BelongsTo);
  });
});
