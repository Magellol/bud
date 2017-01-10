const { expect } = require('chai');
const { connection, Models } = require('../../src/server/models');
const { testModelValidation } = require('../test-helpers');
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

  it('Should error out for invalid names', function () {
    const tests = [
      [false, 'The name must be a string'],
      ['', 'You must provide a name'],
      ['hello world_', 'The name can only include letters, numbers and spaces'],
      ['a', 'The category name must be between 3 and 30 characters long']
    ];

    return testModelValidation(tests, {
      model: Models.ExpenseCategory,
      defaultFields: {},
      fieldToTest: 'name'
    });
  });

  it('Should trim() the name before saving it into the DB', function () {
    const category = Models.ExpenseCategory.build({
      name: '   hello    World ',
      UserId: 1
    });

    expect(category.get('name')).to.be.equal('hello World');
  });
});
