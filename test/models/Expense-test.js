const { expect } = require('chai');
const { connection, Models } = require('../../src/server/models');
const { testModelValidation } = require('../test-helpers');
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

  it('Should error out for invalid amounts', function () {
    const tests = [
      [false, 'The amount must be a decimal (i.e 20.00)'],
      ['false', 'The amount must be a decimal (i.e 20.00)'],
      [true, 'The amount must be a decimal (i.e 20.00)'],
      ['true', 'The amount must be a decimal (i.e 20.00)'],
      [[true], 'The amount must be a decimal (i.e 20.00)'],
      [{}, 'The amount must be a decimal (i.e 20.00)'],
      [{ a: 1 }, 'The amount must be a decimal (i.e 20.00)'],
      ['', 'You must provide a valid amount'],
      ['a', 'The amount must be a decimal (i.e 20.00)'],
      ['0', 'Your amount cannot be less than one cent'],
      [0, 'Your amount cannot be less than one cent'],
      [-1, 'Your amount cannot be less than one cent'],
      [0.005, 'Your amount cannot be less than one cent'],
      [-0.005, 'Your amount cannot be less than one cent']
    ];

    return testModelValidation(tests, {
      model: Models.Expense,
      defaultFields: { name: 'expense' },
      fieldToTest: 'amount'
    });
  });

  it('Should error out for invalid names', function () {
    const tests = [
      [false, 'Invalid name'],
      [true, 'Invalid name'],
      ['', 'You must provide a name'],
      ['a', 'The expense name must be between 3 and 30 characters long'],
      ['0', 'The expense name must be between 3 and 30 characters long'],
      [0, 'Invalid name'],
      ['hello_ world', 'The name can only include letters, numbers and spaces']
    ];

    return testModelValidation(tests, {
      model: Models.Expense,
      defaultFields: { amount: 2.45 },
      fieldToTest: 'name'
    });
  });
});
