const {SizeController} = require('../controllers');
const sizeRouter = require('express').Router();

sizeRouter.post('/createSize', SizeController.createSize);
sizeRouter.delete('/deleteSize', SizeController.deleteSize);
// sizeRouter.get('/sizesByProductId/:productId', SizeController.findSizes)

module.exports = sizeRouter;
