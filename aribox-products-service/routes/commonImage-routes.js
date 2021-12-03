const {CommonImageController} = require('../controllers');
const commonImageRouter = require('express').Router();

commonImageRouter.post('/createCommonImage', CommonImageController.createCommonImage);
commonImageRouter.delete('/deleteCommonImage', CommonImageController.deleteCommonImage);
// commonImageRouter.get('/commonImagesByProductId/:productId', CommonImageController.findCommonImages);

module.exports = commonImageRouter;
