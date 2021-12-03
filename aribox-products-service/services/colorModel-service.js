const {ColorModelModel, ProductModel} = require('../db');
const {Op} = require('sequelize');
const uuid = require('uuid');

class ColorModelService {
  /**
   * создание цвето-модели для товара
   * @param productId
   * @param colorCode
   * @param image
   * @param colorName
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async createColorModel(productId, colorCode, image, colorName) {
    try{
      const product = await ProductModel.findByPk(productId);

      if (!product) {
        return {status: 400, data: {message: 'Товара с таким id не существует'}};
      }

      const colorModel = await ColorModelModel.findOne({
        where: {
          [Op.and]: {
            productId,
            colorName
          }
        }
      });

      if(!colorModel){
        await ColorModelModel.create({productId, colorCode, image, colorName});

        return {status: 200, data: { message: 'Добавлена новая цвето-модель' } };
      } else {
        return {status: 400, data: { message: 'Такая цвето-модель уже сущетсвует' }};
      }

    } catch(e) {
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }

  /**
   * удаление цвето-модели товара по ее id
   * @param colorModelId
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async deleteColorModel(colorModelId) {
    try{
      const colorModel = await ColorModelModel.findByPk(colorModelId);

      if(colorModel){
        await colorModel.destroy();

        return {status: 200, data: { message: 'Цвето-модель удалена' } };
      } else {
        return {status: 400, data: { message: 'Не существует такой цвето-модели' }};
      }

    } catch(e) {
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }

  /**
   * удаление всех цвето-моделей товара
   * @param productId
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async deleteColorModels(productId) {
    try {
      await ColorModelModel.destroy({where: {productId}});
      return {status: 200, data: {message: `Цвето-модели по productId = ${productId} удалены`}};
    } catch(e) {
      console.log(e);
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }
}

module.exports = new ColorModelService();
