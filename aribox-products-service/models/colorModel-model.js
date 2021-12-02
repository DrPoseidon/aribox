const { DataTypes } = require('sequelize');
const {sequelize, Product} = require('../db');

module.exports = {
  colorModelId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'colormodelid'
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product,
      key: 'productid'
    },
    field: 'productid'
  },
  colorCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'colorcode'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colorName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'colorname'
  }
};
