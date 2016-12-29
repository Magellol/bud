const path = require('path');
const config = require('config').datasource;
const Sequelize = require('sequelize');

const connection = new Sequelize(
  config.get('database'),
  config.get('username'),
  config.get('password'),
  {
    dialect: config.get('dialect'),
    host: config.get('host'),
    define: {
      underscored: true
    },
    pool: {
      max: 5,
      min: 0
    }
  }
);

const definitions = [
  'User',
  'ExpenseCategory'
];

const Models = definitions.reduce((acc, modelName) => {
  const filePath = path.join(__dirname, modelName);
  const model = connection.import(filePath);

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
  connection,
  Sequelize,
  Models
};
