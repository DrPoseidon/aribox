const {ColorModelController} = require('../controllers');
const colorModelRouter = require('express').Router();

colorModelRouter.post('/createColorModel', ColorModelController.createColorModel);
colorModelRouter.delete('/deleteColorModel', ColorModelController.deleteColorModel);
// colorModelRouter.get('/colorModelsByProductId/:productId', ColorModelController.findColorModels);

module.exports = colorModelRouter;
