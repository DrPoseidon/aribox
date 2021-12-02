const { DataTypes } = require('sequelize');
const {sequelize, Product} = require('../db');

module.exports = {
  commonImageId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'commonimageid'
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
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
};
