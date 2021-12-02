const {sequelize, ColorModel, Size, CommonImage} = require('../db');
const {DataTypes} = require('sequelize');

module.exports = {
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'productid'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mainImage: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'mainimage'
  },
  materials: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  discount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
};
