const { DataTypes } = require('sequelize');
const {sequelize, ProductModel} = require('../db');

module.exports = {
  sizeId: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'sizeid'
  },
  productId: { // внешний ключ
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: ProductModel, // к какой модели принадлежит
      key: 'productid', // название столбца в модели
    },
    field: 'productid'
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  }
};
