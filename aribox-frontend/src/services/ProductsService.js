import ProductsApi from '../api/ProductsApi';

export default  class ProductsService {
  static async getAllProducts(){
    return await ProductsApi.get('/products');
  }

  static async getProductById(id) {
    return await ProductsApi.get(`/product/${id}`);
  }
}