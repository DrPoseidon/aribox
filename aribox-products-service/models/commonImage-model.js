const { DataTypes } = require('sequelize');
const {sequelize, Product} = require('../db');

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
      model: Product, // какой модели принадлежит
      key: 'productid' // название столбца в модели
    },
    field: 'productid'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};
