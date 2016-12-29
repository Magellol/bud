const path = require('path');
const database = require('../services/db');

const definitions = [
  'User',
  'ExpenseCategory'
];

const Models = definitions.reduce((acc, modelName) => {
  const filePath = path.join(__dirname, modelName);
  const model = database.import(filePath);

  return Object.assign({}, acc, {
    [model.name]: model
  });
}, {});

Object.values(Models).map(model => {
  const prop = model.associate;
  if (typeof prop === 'undefined') {
    return;
  }

  if (typeof prop !== 'function') {
    throw new Error(
      `Failure at establishing associations for model "${model.name}". ` +
      `Invalid "associate" property has been found in its model definition. ` +
      `Expected "function" but received instead "${typeof prop}".`
    );
  }

  model.associate(Models);
});

module.exports = {
  Models,
  connection: database
};
