const {SizeService} = require('../services');

class SizeController {
  /**
   * создание размера товара
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async createSize(req, res) {
    try{
      const {productId, size} = req.body;
      const sizeData = await SizeService.createSize(productId, size);
      return res.status(sizeData.status).json(sizeData.data);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * удаление размера товара по id
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async deleteSize(req, res) {
    try{
      const {sizeId} = req.body;
      const sizeData = await SizeService.deleteSize(sizeId);
      return res.status(sizeData.status).json(sizeData.data);
    } catch(e) {
      console.log(e);
    }
  }

  // async findSizes(req, res) {
  //   try {
  //     const {productId} = req.params;
  //
  //     const sizesData = await SizeService.findSizes(productId);
  //
  //     return res.status(sizesData.status).json(sizesData.data);
  //   } catch(e) {
  //     console.log(e);
  //     return res.status(500).json({message: 'Произошла ошибка'});
  //   }
  // }
}

module.exports = new SizeController()
