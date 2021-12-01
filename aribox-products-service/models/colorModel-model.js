const { DataTypes } = require('sequelize');

module.exports = {
  colormodelid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productid: {
    type: DataTypes.STRING,
    allowNull: false,
    foreignKey: true
  },
  colorcode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colorname: {
    type: DataTypes.STRING,
    allowNull: false
  }
};
