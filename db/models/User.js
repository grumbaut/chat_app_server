const conn = require('../conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  name: Sequelize.STRING
});

module.exports = User;
