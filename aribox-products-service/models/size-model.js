const { DataTypes } = require('sequelize');

module.exports = {
  sizeid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productid: {
    type: DataTypes.STRING,
    allowNull: false,
    foreignKey: true
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  }
};
