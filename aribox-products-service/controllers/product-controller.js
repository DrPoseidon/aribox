const ProductService = require('../services/product-service');

class ProductController {
  async getAllProducts(req,res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch(e) {
      console.log(e);
    }
  }

  async getProductById(req,res) {
    try {
      const {id} = req.params;
      const products = await ProductService.getProductById(id);
      res.status(200).json(products);
    } catch(e) {
      console.log(e);
    }
  }

  async updateProduct(req,res) {
    try {
      const {id, value, key} = req.body;
      const response = await ProductService.updateProduct(id, key, value);
      res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  async createProduct(req,res) {
    try {
      const {name, mainimage, materials, description, price, discount} = req.body;
      const response = await ProductService.createProduct(name, mainimage, materials, description, price, discount);

      res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  async deleteProduct(req,res) {
    try {
      const {id} = req.body;
      const response = await ProductService.deleteProduct(id);

      res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = new ProductController();
