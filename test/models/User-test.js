const { expect } = require('chai');
const { connection, Models } = require('../../src/server/models');
const { testModelValidation } = require('../test-helpers');
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

  it('Should error out when username is not valid', function () {
    const tests = [
      [false, 'The name must be a string'],
      ['', 'You must provide a username'],
      ['hello world', 'Your username can only contain letters'],
      ['a', 'Your username must be between 3 and 20 characters long']
    ];

    return testModelValidation(tests, {
      model: Models.User,
      defaultFields: {},
      fieldToTest: 'username'
    });
  });
});
