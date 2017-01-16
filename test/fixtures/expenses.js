const moment = require('moment');

const now = moment();

module.exports = [
  {
    id: 1,
    amount: 9.99,
    name: 'Expense 1',
    ExpenseCategoryId: 1,
    createdAt: now,
    updatedAt: now
  },
  {
    id: 2,
    amount: 45.01,
    name: 'Expense 2',
    ExpenseCategoryId: 1,
    createdAt: now,
    updatedAt: now
  },
  {
    id: 3,
    amount: 50,
    name: 'Expense 3',
    ExpenseCategoryId: 3,
    createdAt: moment(now).year(1980).month('january'),
    updatedAt: moment(now).year(1980).month('january')
  },
  {
    id: 4,
    amount: 50,
    name: 'Expense 4',
    ExpenseCategoryId: 3,
    createdAt: moment(now).year(1980).month('february'),
    updatedAt: moment(now).year(1980).month('february')
  },
  {
    id: 5,
    amount: 50,
    name: 'Expense 5',
    ExpenseCategoryId: 3,
    createdAt: moment(now).year(1979).month('december'),
    updatedAt: moment(now).year(1979).month('december')
  },
  {
    id: 6,
    amount: 50,
    name: 'Expense 6',
    ExpenseCategoryId: 4,
    createdAt: moment(now).year(1979).month('december'),
    updatedAt: moment(now).year(1979).month('december')
  },
  {
    id: 7,
    amount: 50,
    name: 'Expense 7',
    ExpenseCategoryId: 3,
    createdAt: moment(now).year(1980).month('january'),
    updatedAt: moment(now).year(1980).month('january')
  },
];
