const {ProductModel, ColorModelModel, CommonImageModel, SizeModel} = require('../db');
const uuid = require('uuid');
const {Op} = require('sequelize');
const ColorModelService = require('../services/colorModel-service');
const SizeService = require('../services/size-service');
const CommonImageService = require('../services/commonImage-service');

class ProductService {
  /**
   * получение списка товаров из бд
   * @returns {Promise<*>}
   */
  async getAllProducts() {
    try{
      return await ProductModel.findAll({
        // inner
        include: [
          {
            as: 'sizes',
            model: SizeModel,
            required: false, // left join,
          },
          {
            as: 'colorModels',
            model: ColorModelModel,
            required: false,
          },
          {
            as: 'commonImages',
            model: CommonImageModel,
            required: false,
          }
        ],
      });
    } catch (e) {
      return {status: 500, data: {message: 'Произошла ошибка', error: e}};
    }
  }

  /**
   * получение одного товара из списка по id
   * @returns {Promise<*>}
   * @param productId
   */
  async getProductById(productId) {
    try{
      return await ProductModel.findByPk(productId, {
        include: [
          {
            as: 'sizes',
            model: SizeModel,
            required: false, // left join,
          },
          {
            as: 'colorModels',
            model: ColorModelModel,
            required: false,
          },
          {
            as: 'commonImages',
            model: CommonImageModel,
            required: false,
          }
        ],
      });
    } catch (e) {
      return {status: 500, data: {message: 'Произошла ошибка', error: e}};
    }
  }

  /**
   * обновление информации о товаре
   * @param productId
   * @param key
   * @param value
   * @returns {Promise<{data: {message: string}, status: number}>}
   */
  async updateProduct(productId, key, value) {
    try {
      const product = await ProductModel.findOne({where: {productId}});

      if(product) {
        if(product[key] === value) {
          return {status: 400, data: {message: `Введите другое значение ${key}`}};
        }else {
            await product.update({[key]: value});
            return {status: 200, data: {message: `Данные обновлены name = ${value}`}};
        }
      } else {
        return {status: 404, data: {message: 'Не найден товар с указанным id'}};
      }
    } catch(e) {
      return {status: 500, data: {message: 'Произошла ошибка', error: e}};
    }
  }

  /**
   * создание товара
   * @param name
   * @param mainImage
   * @param materials
   * @param description
   * @param price
   * @param discount
   * @returns {Promise<{data: {message: string}, status: number}>}
   */
  async createProduct(name, mainImage, materials, description, price, discount) {
    try{
      const product = await ProductModel.findOne({where: {name}});

      if(!product){
        const productId = uuid.v4()

        await ProductModel.create({productId, name, mainImage, materials, description, price, discount});

        return {status: 200, data: {message: 'Товар успешно добавлен', productId}};
      } else{
        return {status: 400, data: {message: 'Товар с указанным названием уже существует'}};
      }
    } catch(e) {
      console.log(e)
      return {status: 500, data: {message: 'Произошла ошибка', error: e}};
    }
  }

  /**
   * удаление товара
   * @returns {Promise<{data: {message: string}, status: number}>}
   * @param productId
   */
  async deleteProduct(productId) {
    try {

      await ColorModelService.deleteColorModels(productId);
      await SizeService.deleteSizes(productId);
      await CommonImageService.deleteCommonImages(productId);
      const product = await ProductModel.findByPk(productId);
      if(product){
        await product.destroy();
        return {status: 200, data: {message: 'Товар успешно удален'}};
      } else{
        return {status: 400, data: {message: 'Не найден товар по указанному id'}};
      }
    } catch(e) {
      console.log(e);
      return {status: 500, data: {message: 'Произошла ошибка', error: e}};
    }
  }

  async getNumberOfProducts(ids) {
    try {
      const response = await ProductModel.findAll({
        where: {
          productId: ids
        }
      });

      if(response.length) {
        const quantity = response.reduce((acc, el) => {
          acc.push({productId: el.productId, quantity: el.quantity})
          return acc;
        }, []);

        return {status: 200, data: {quantity}}
      } else {
        return {status: 404}
      }


    } catch(e) {
      console.log(e);
      return {status: 500, data: {message: 'Произошла ошибка', error: e}};
    }
  }

  async changeQuantitys(products) {
    try {
      for (const product of products) {
        const productData = await ProductModel.findOne({where: {productId: product.productId}});

        if(productData.quantity > 0) {
          await productData.update({quantity: productData.quantity - product.quantity});
        }
      }

      return {status: 200, data: {message: 'Успех!'}};


    } catch(e) {
      console.log(e);
      return {status: 500, data: {message: 'Произошла ошибка', error: e}};
    }
  }
}

module.exports = new ProductService();
