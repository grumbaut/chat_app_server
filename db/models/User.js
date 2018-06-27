const conn = require('../conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = User;
