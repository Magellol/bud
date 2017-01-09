const moment = require('moment');

const now = moment();

module.exports = [
  {
    id: 1,
    name: 'Category 1',
    UserId: 1,
    createdAt: now,
    updatedAt: now
  },
  {
    id: 2,
    name: 'Category 2',
    UserId: 2,
    createdAt: now,
    updatedAt: now
  },
  {
    id: 3,
    name: 'Category 3',
    UserId: 1,
    createdAt: moment(now).year(1980).month('january'),
    updatedAt: moment(now).year(1980).month('january')
  },
  {
    id: 4,
    name: 'Category 4',
    UserId: 1,
    createdAt: moment(now).year(1979).month('december'),
    updatedAt: moment(now).year(1979).month('december')
  }
];
