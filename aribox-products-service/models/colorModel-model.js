const { DataTypes } = require('sequelize');
const {sequelize, Product} = require('../db');

module.exports = {
  colorModelId: {
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'colormodelid',
    autoIncrement: true,
  },
  productId: { // внешний ключ
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product, // к какой модели принадлежит

      key: 'productid' // название столбца модели
    },
    field: 'productid'
  },
  colorCode: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'colorcode'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'image'
  },
  colorName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'colorname'
  }
};
