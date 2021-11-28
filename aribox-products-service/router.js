const ProductController = require('./controllers/product-controller')
const Router = require('express').Router;
const router = new Router();

// CREATE
router.post('/createProduct', ProductController.createProduct);
// READ
router.get('/products', ProductController.getAllProducts);
// READ
router.get('/product/:id', ProductController.getProductById);
// UPDATE
router.put('/updateProduct', ProductController.updateProduct);
// DELETE
router.delete('/deleteProduct', ProductController.deleteProduct);

module.exports = router;
