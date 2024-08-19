const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Speaker = sequelize.define('Speaker', {
  expertise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricePerSession: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Speaker;