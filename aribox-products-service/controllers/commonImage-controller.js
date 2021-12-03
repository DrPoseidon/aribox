const {CommonImageService} = require('../services');

class CommonImageController {
  /**
   * создание изображений товара
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async createCommonImage(req, res) {
    try{
      const {productId, url} = req.body;
      const commonImage = await CommonImageService.createCommonImage(productId, url);
      return res.status(commonImage.status).json(commonImage.data);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * удаление изображения товара по id
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async deleteCommonImage(req, res) {
    try{
      const {commonImageId} = req.body;
      const commonImage = await CommonImageService.deleteCommonImage(commonImageId);
      return res.status(commonImage.status).json(commonImage.data);
    } catch(e) {
      console.log(e);
    }
  }

  // async findCommonImages(req, res) {
  //   try {
  //     const {productId} = req.params;
  //
  //     const commonImagesData = await CommonImageService.findCommonImages(productId);
  //
  //     return res.status(commonImagesData.status).json(commonImagesData.data);
  //   } catch(e) {
  //     console.log(e);
  //     return res.status(500).json({message: 'Произошла ошибка'});
  //   }
  // }
}

module.exports = new CommonImageController()
