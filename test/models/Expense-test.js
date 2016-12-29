const { expect } = require('chai');
const { connection, Models } = require('../../src/server/models');
const Expense = require('../../src/server/models/Expense');

const { Sequelize } = connection;

describe('Expense', function () {
  it('Should export an instance of Model', function () {
    const result = Expense(connection, Sequelize.DataTypes);

    expect(result).to.be.an.instanceof(Sequelize.Model);
  });

  it('Should associate Expense', function () {
    const result = Expense(connection, Sequelize.DataTypes);
    result.associate(Models);

    const assoc = result.associations;

    expect(Object.values(assoc).length).to.be.equal(1);
    expect(assoc.ExpenseCategory).to.be.an.instanceof(Sequelize.Association.BelongsTo);
  });
});
