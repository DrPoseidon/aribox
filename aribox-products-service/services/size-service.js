const {SizeModel, ProductModel} = require('../db');
const {Op} = require('sequelize');
const uuid = require('uuid');

class SizeService {
  /**
   * создание размера товара
   * @param productId
   * @param size
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async createSize(productId, size) {
    try{
      const product = await ProductModel.findByPk(productId);

      if (!product) {
        return {status: 400, data: {message: 'Товара с таким id не существует'}};
      }

      const sizeData = await SizeModel.findOne({
        where: {
          [Op.and]: {
            productId,
            size
          }
        }
      });

      if(!sizeData){
        await SizeModel.create({sizeId: uuid.v4(), productId, size});
        return {status: 200, data: { message: 'Добавлен новый размер' } };
      } else {
        return {status: 400, data: { message: 'Такой размер уже существует' }};
      }

    } catch(e) {
      console.log(e)
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }

  /**
   * удаление размера по его id
   * @param sizeId
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async deleteSize(sizeId) {
    try{
      const sizeData = await SizeModel.findByPk(sizeId);

      if(sizeData){
        await sizeData.destroy();

        return {status: 200, data: { message: 'Размер удален' } };
      } else {
        return {status: 400, data: { message: 'Не существует такого размера' }};
      }

    } catch(e) {
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }

  /**
   * удаление всех размеров товара
   * @param productId
   * @returns {Promise<{data: {message: string}, status: number}|{data: {message: string, error}, status: number}>}
   */
  async deleteSizes(productId) {
    try {
      await SizeModel.destroy({where: {productId}});
      return {status: 200, data: {message: `Размеры по productId = ${productId} удалены`}};

    } catch(e) {
      return { status: 500, data: { message: 'Произошла ошибка', error: e } };
    }
  }
}

module.exports = new SizeService();
