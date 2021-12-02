const { DataTypes } = require('sequelize');
const {sequelize, Product} = require('../db');

module.exports = {
  sizeId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'sizeid'
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product,
      key: 'productid',
    },
    field: 'productid'
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  }
};
