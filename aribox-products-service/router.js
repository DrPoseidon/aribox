const ProductController = require('./controllers/product-controller')
const Router = require('express').Router;
const router = new Router();
const uuid = require('uuid');

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

// генерация случайного id
router.get('/uuid', (req, res) => {
  return res.status(200).json({uuid: `${uuid.v4()}-${new Date().getTime()}`});
});

module.exports = router;
