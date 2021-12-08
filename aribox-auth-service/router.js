const Router = require('express').Router;
const router = new Router;
const UserController = require('./controllers/user-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const {check} = require('express-validator');

router.post('/registration',
  check('email', 'Email не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть больше 4 и меньше 30 символов')
    .isLength({min: 4, max: 30}),
  check('name', 'Минимальная длина имени 3 символа')
    .isLength({min: 3}),
  UserController.registration);

router.post('/refresh', UserController.refresh);

router.post('/checkAuth', authMiddleware, UserController.checkAuth);

router.get('/activate/:activationLink', UserController.activate);

router.get('/users', authMiddleware, UserController.getAllUsers);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

router.put('/addToCart', authMiddleware, UserController.addToCart);

router.post('/getCart', authMiddleware, UserController.getCart);

router.post('/removeFromCart', authMiddleware, UserController.removeFromCart);

router.put('/changeProductQuantity', authMiddleware, UserController.changeProductQuantity)

module.exports = router
