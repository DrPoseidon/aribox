const {Sequelize} = require('sequelize');
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

const ProductModel = new DefineModel('products', product);
const ColorModelModel = new DefineModel('colormodels', colorModel);
const CommonImageModel = new DefineModel('commonimages', commonImage);
const SizeModel = new DefineModel('sizes', size);

// связь ProductModel c ColorModelModel один-ко-многим через foreignKey productId
ProductModel.hasMany(ColorModelModel, {
  as: 'colorModels',
  foreignKey: {
    name: 'productId'
  }
});

// связь ProductModel c SizeModel один-ко-многим через foreignKey productId
ProductModel.hasMany(SizeModel, {
  as: 'sizes',
  foreignKey: {
    name: 'productId'
  }
});

// связь ProductModel c CommonImageModel один-ко-многим через foreignKey productId
ProductModel.hasMany(CommonImageModel, {
  as: 'commonImages',
  foreignKey: {
    name: 'productId'
  }
});

module.exports = {
  ProductModel,
  ColorModelModel,
  CommonImageModel,
  SizeModel,
  sequelize,
};


