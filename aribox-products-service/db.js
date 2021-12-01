const {Sequelize} = require('sequelize');
// const product = require("./models/product-model");
const {product, colorModel, commonImage, size} = require('./models')
const sequelize = new Sequelize('new_aribox', 'postgres', '461385', {
  dialect: 'postgres',
  host: 'localhost',
});

class DefineModel{
  modelName;
  attributes;

  constructor(modelName, attributes) {
    this.modelName = modelName;
    this.attributes = attributes;

    return sequelize.define(modelName, {...attributes}, {timestamps: false});
  }
}

const Product = new DefineModel('products', product);
const ColorModel = new DefineModel('colormodels', colorModel);
const CommonImage = new DefineModel('commonimages', commonImage);
const Size = new DefineModel('sizes', size);

module.exports = {
  Product,
  ColorModel,
  CommonImage,
  Size,
  sequelize,
};


