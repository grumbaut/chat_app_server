const conn = require('../conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = User;
