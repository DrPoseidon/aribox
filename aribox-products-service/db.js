const {Sequelize} = require('sequelize');
const product = require("./models/product-model");

const sequelize = new Sequelize('new_aribox', 'postgres', '461385', {
  dialect: 'postgres',
  host: 'localhost',
});

const Product = sequelize.define('product', {...product}, {timestamps: false});

module.exports = {
  Product,
  sequelize,
};
