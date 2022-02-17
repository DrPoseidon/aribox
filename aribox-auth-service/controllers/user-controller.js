const UserService = require('../services/user-service');
const { validationResult } = require('express-validator');

class UserController {
  /**
   * регистрация пользователя
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async registration(req,res) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации', errors});
      }

      const {email, name, password} = req.body;
      const userData = await UserService.registration(email, name, password);

      const {status, data} = userData;

      return  res.status(status).json({...data});

    } catch(e) {
      console.log(e);
      res.status(400).json({message: 'Error'});
    }
  }

  /**
   * метод логирования
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async login(req,res) {
    try {
      const {email, password} = req.body;
      const userData = await UserService.login(email, password);

      const {status, data} = userData;
      if(data.userData && data.userData.tokens) {
        res.cookie('refreshToken', data.userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      }

      return  res.status(status).json({...data})
    } catch(e) {
      console.log(e);
      res.status(400).json({message: 'Error'});
    }
  }

  /**
   * выход пользователя из системы (удаление токенов)
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async logout(req,res) {
    try {
      const {email} = req.body;
      const response = await UserService.logout(email);
      res.clearCookie('refreshToken');
      return res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
      res.status(400).json({message: 'Error'});
    }
  }

  /**
   * обновление токенов
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async refresh(req, res) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      const {status, data} = userData;
      if(data.userData && data.userData.tokens) {
        res.cookie('refreshToken', data.userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      }

      return  res.status(status).json({...data})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Error'});
    }
  }

  /**
   * активация аккаунта
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async activate(req,res) {
    try {
      const {activationLink} = req.params;
      await UserService.activate(activationLink);
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Error'});
    }
  }

  /**
   * получение списка пользователей
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAllUsers(req,res) {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json(users);
    } catch(e) {
      console.log(e);
      res.status(400).json({message: 'Error'});
    }
  }

  async checkAuth(req, res) {
    try {
      return res.status(200).json({message: 'Пользователь авторизован'});
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }

  async addToCart(req, res) {
    try {
      const {userId, product} = req.body;

      const response = await UserService.addToCart(userId, product);

      return res.status(response.status).json(response.data);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }

  async getCart(req, res) {
    try {
      const {userId} = req.body;
      const {status, data: cart} = await UserService.getCart(userId);
      return res.status(status).json(cart);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }

  async removeFromCart(req, res) {
    try {
      const {userId, product} = req.body.data;
      const {status, data} = await UserService.removeFromCart(userId, product);
      return res.status(status).json(data);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }

  async changeProductQuantity(req, res) {
    try {
      const {userId, product, value} = req.body;
      const {status, data} = await UserService.changeProductQuantity(userId, product, value);
      return res.status(status).json(data);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }

  async checkout(req,res) {
    try {
      const {cart, total, id} = req.body;
      const date = new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'UTC'
      });

      const {status, data} = await UserService.checkout(id, cart, total, date);
      return res.status(status).json(data);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }

  async getOrders(req, res) {
    try {
      const {userId} = req.body;
      const {status, data} = await UserService.getOrders(userId);

      return res.status(status).json(data);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Error'});
    }
  }
}

module.exports = new UserController;
