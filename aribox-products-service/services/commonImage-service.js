const {CommonImageModel, ProductModel} = require('../db');
const {Op} = require('sequelize');
const uuid = require('uuid');

class CommonImageService {
  /**
   * создание цвето-модели товара
   * @param productId
   * @param url
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async createCommonImage(productId, url) {
    try{
      const product = await ProductModel.findByPk(productId);

      if (!product) {
        return {status: 400, data: {message: 'Товара с таким id не существует'}};
      }

      const commonImage = await CommonImageModel.findOne({
        where: {
          [Op.and]: {
            productId,
            url
          }
        }
      });

      if(!commonImage){
        await CommonImageModel.create({commonImageId: uuid.v4(), productId, url});
        return {status: 200, data: { message: 'Добавлено новое изображение' } };
      } else {
        return {status: 400, data: { message: 'Такое изображение уже существует' }};
      }

    } catch(e) {
      console.log(e)
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }

  /**
   * удаление цвето-модели товара по ее id
   * @param commonImageId
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async deleteCommonImage(commonImageId) {
    try{
      const commonImage = await CommonImageModel.findByPk(commonImageId);

      if(commonImage){
        await commonImage.destroy();

        return {status: 200, data: { message: 'Изображение удалено удалена' } };
      } else {
        return {status: 400, data: { message: 'Не существует такого изображения' }};
      }

    } catch(e) {
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }

  /**
   * удаление всех изображений товара
   * @param productId
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async deleteCommonImages(productId) {
    try {
      await CommonImageModel.destroy({where: {productId}});
      return {status: 200, data: {message: `Изображения по productId = ${productId} удалены`}};
    } catch(e) {
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }
}

module.exports = new CommonImageService();
