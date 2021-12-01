const { DataTypes } = require('sequelize');

module.exports = {
  commonimageid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productid: {
    type: DataTypes.STRING,
    allowNull: false,
    foreignKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
};
