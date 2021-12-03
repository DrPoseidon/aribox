const {ColorModelService} = require('../services');

class ColorModelController {
  /**
   * создание цвето-модели товара
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async createColorModel(req, res) {
    try{
      const {productId, colorCode, image, colorName} = req.body;
      const colorModel = await ColorModelService.createColorModel(productId, colorCode, image, colorName);
      return res.status(colorModel.status).json(colorModel.data);
    } catch(e) {
      console.log(e);
      return res.status(500).json({message: 'Произошла ошибка'});
    }
  }

  /**
   * удаление цвето-модели товара по ее id
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async deleteColorModel(req, res) {
    try{
      const {colorModelId} = req.body;
      const colorModel = await ColorModelService.deleteColorModel(colorModelId);
      return res.status(colorModel.status).json(colorModel.data);
    } catch(e) {
      console.log(e);
      return res.status(500).json({message: 'Произошла ошибка'});
    }
  }

  // async findColorModels(req, res) {
  //   try {
  //     const {productId} = req.body;
  //
  //     const colorModelsData = await ColorModelService.findColorModels(productId);
  //
  //     return res.status(colorModelsData.status).json(colorModelsData.data);
  //   } catch(e) {
  //     console.log(e);
  //     return res.status(500).json({message: 'Произошла ошибка'});
  //   }
  // }
}

module.exports = new ColorModelController()
