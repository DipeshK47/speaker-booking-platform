const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;