const {ProductController} = require('../controllers');
const productRouter = require('express').Router();

productRouter.post('/createProduct', ProductController.createProduct);
productRouter.get('/products', ProductController.getAllProducts);
productRouter.get('/product/:productId', ProductController.getProductById);
productRouter.put('/updateProduct', ProductController.updateProduct);
productRouter.delete('/deleteProduct', ProductController.deleteProduct);

module.exports = productRouter;
