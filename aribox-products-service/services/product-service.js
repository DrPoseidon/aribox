const {Product} = require('../db');
const uuid = require('uuid');

class ProductService {
  async getAllProducts() {
    try{
      return await Product.findAll();
    } catch (e) {
      console.log(e)
    }
  }

  async getProductById(id) {
    try{
      return await Product.findByPk(id);
    } catch (e) {
      console.log(e)
    }
  }

  async updateProduct(id, key, value) {
    const product = await Product.findOne({where: {productid: id}});

    if(product) {
      await product.update({[key]: value});
      return {status: 200, data: {message: 'Данные обновлены'}};
    } else {
      return {status: 404, data: {message: 'Не найден товар с указанным id'}};
    }
  }

  async createProduct(name, mainimage, materials, description, price, discount) {
    const product = await Product.findOne({where: {'name': name}});

    if(!product){
      await Product.create({productid: uuid.v4(), name, mainimage, materials, description, price, discount});
      return {status: 200, data: {message: 'Товар успешно добавлен'}};
    } else{
      return {status: 400, data: {message: 'Товар с указанным названием уже существует'}};
    }
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);

    if(product){
      await product.destroy();
      return {status: 200, data: {message: 'Товар успешно удален'}};
    } else{
      return {status: 400, data: {message: 'Не найден товар по указанному id'}};
    }
  }
}

module.exports = new ProductService();
