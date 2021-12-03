const { DataTypes } = require('sequelize');
const {sequelize, ProductModel} = require('../db');

module.exports = {
  commonImageId: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'commonimageid'
  },
  productId: { // вшений ключ
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: ProductModel, // какой модели принадлежит
      key: 'productid' // название столбца в модели
    },
    field: 'productid'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};
