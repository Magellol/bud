const Db = require('../services/db');

module.exports = Db.connection.define('user', {
  id: {
    type: Db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Db.Sequelize.STRING(60),
    allowNull: false,
    unique: true
  }
});
