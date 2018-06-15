const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/pep_db');

module.exports = conn;
