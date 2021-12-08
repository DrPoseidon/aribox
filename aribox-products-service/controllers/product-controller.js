const {ProductService} = require('../services');

class ProductController {
  /**
   * получение списка всех товаров
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getAllProducts(req,res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * получение товара по id
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getProductById(req,res) {
    try {
      const {productId} = req.params;
      const products = await ProductService.getProductById(productId);
      res.status(200).json(products);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * обновление инцормации о товаре
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async updateProduct(req,res) {
    try {
      const {productId, value, key} = req.body;
      const response = await ProductService.updateProduct(productId, key, value);
      res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * создание товара
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async createProduct(req,res) {
    try {
      const {name, mainImage, materials, description, price, discount} = req.body;
      const response = await ProductService.createProduct(name, mainImage, materials, description, price, discount);

      res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * удаление товара
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async deleteProduct(req,res) {
    try {
      const {productId} = req.body;
      const response = await ProductService.deleteProduct(productId);

      res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  async getNumberOfProducts(req, res) {
    try {
      const ids = req.body;
      const response = await ProductService.getNumberOfProducts(ids);

      res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = new ProductController();
