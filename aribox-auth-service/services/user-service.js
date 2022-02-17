const UserModel = require('../models/user-model');
const MailService = require('./mail-service');
const TokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const bcrypt = require('bcrypt');
const uuid = require('uuid')

class UserService {
  /**
   * метод регистрации
   * @param email
   * @param name
   * @param password
   * @returns {Promise<any>}
   */
  async registration(email, name, password) {
    try {
      const exists = await UserModel.findOne({ email });

      if(!exists) {
        // если пользователя с таким email нет в системе
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        try {
          await MailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/activate/${activationLink}`);
        } catch (e) {
          console.log(e, 1);
          return {status: 500, data: {message: 'Произошла ошибка'}}
        }

        try {
          await UserModel.create({email, name, password: hashPassword, activationLink});
        } catch (e) {
          console.log(e, 2);
          return {status: 500, data: {message: 'Произошла ошибка'}}
        }

        return {status: 200, data: {message: 'Регистрация прошла успешно'}};
      } else {
        return {status: 400, data: {message: 'Пользователь с такими данными уже существует'}};
      }
    } catch(e) {
      return {status: 500, data: {message: 'Произошла ошибка'}}
    }
  }

  /**
   * метод логирования
   * @param email
   * @param password
   * @returns {Promise<{data: {message: string}, status: number}>}
   */
  async login(email, password) {
    try {
      const user = await UserModel.findOne({email});
      if(user) {
        // если пользователь с таким email существует
        const comparison = await bcrypt.compare(password, user.password)

        if(!comparison) {
          // если пароль полученный, не совпадает с паролем в бд
          return {status: 400, data: {message: 'Неверный пароль'}};
        }

        if(!user.isActivated) {
          // если аккаунт не активирован
          return {status: 400, data: {message: 'Аккаунт пользователя не активирован'}};
        }

        const userData = await this.sendUser(user);
        return {status: 200, data: {message: 'Авторизация прошла успешно', userData, cart: user.cart}};
      } else {
        return {status: 404, data: {message: 'Пользователь с такими данными не найден'}};
      }
    } catch(e) {
      return {status: 500, data: {message: 'Произошла ошибка'}}
    }
  }

  /**
   * выход пользователя из системы (удаление токенов)
   * @param email
   * @returns {Promise<{status: number}>}
   */
  async logout(email) {
    try {
      const userData = await UserModel.findOne({email});

      if(userData) {
        await TokenService.deleteRefreshToken(userData._id);

        return {status: 200, data: {message: 'Пользователь вышел из системы'}};
      }

      return {status: 500, data: {message: 'Произошла ошибка'}};

    } catch(e) {
      console.log(e);
    }
  }

  /**
   * обновление токенов
   * @param refreshToken
   * @returns {Promise<{data: {userData: {tokens: {accessToken: *, refreshToken: *}, user: UserDto}}, status: number}|{data: {message: string}, status: number}>}
   */
  async refresh(refreshToken) {
    if (!refreshToken) {
      return {status: 401, data: {message: 'Пользователь не авторизован', reason: 'Не пришел рефреш токен'}};
    }

    const validation = TokenService.validateRefreshToken(refreshToken);
    const tokenData = await TokenService.findRefreshToken(refreshToken);

    if(!tokenData || !validation) {
      return {status: 401, data: {message: 'Пользователь не авторизован', reason: 'Рефреш токен не прошел валидацию или не найден такой токен в бд'}};
    }

    const user = await UserModel.findById(tokenData.user);
    const userData = await this.sendUser(user);
    return {status: 200, data: {userData}};
  }

  /**
   * метод получения списка всех пользователей
   * @returns {Promise<*>}
   */
  async getAllUsers() {
    const users = await UserModel.find();

    return users.reduce((acc, user) => {
      acc.push(new UserDto(user));
      return acc;
    },[]);
  }

  /**
   * метод активации аккаунта
   * @param activationLink
   * @returns {Promise<void>}
   */
  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink})

    if(user) {
      // если пользователй с такой ссылкой активации существует
      user.isActivated = true;
      await user.save();
    }
  }

  /**
   * обработка данных для отправки
   * @param user
   * @returns {Promise<{tokens: {accessToken: *, refreshToken: *}, user: UserDto}>}
   */
  async sendUser(user) {
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {tokens, user: userDto};
  }

  async addToCart(userId, product) {
    const userData = await UserModel.findOne({_id: userId});

    if(userData){
      userData.cart.push(product);

      await userData.save();

      return {status: 200, data: {message: 'Товар добавлен в корзину'}};
    }

    return {status: 404, data: {message: 'Не найден пользователь'}};
  }

  async getCart(userId) {
    const {cart} = await UserModel.findOne({_id: userId});

    if (cart) {
      return {status: 200, data: cart};
    } else {
      return {status: 404};
    }
  }

  async removeFromCart(userId, product) {

    const user = await UserModel.findOne({_id: userId});

    user.cart = user.cart.filter(el => {
      return el._id.toString() !== product._id
    });

    await user.save();
    return {status: 200, data: {cart: user.cart}};
  }

  async changeProductQuantity(userId, product, value) {
    const user = await UserModel.findOne({_id: userId});
    user.cart.forEach(el => {
      if (el._id.toString() === product._id) {
        el.quantity = value === 'plus' ? el.quantity +=1 : el.quantity-=1;
      }
    })

    await user.save();
    return {status: 200, data: {cart: user.cart}};
  }

  async checkout(userId, cart, total, date) {
    const userData = await UserModel.findOne({_id: userId});
    if(userData){
      userData.orders.push({cart, total, date, id: uuid.v4()});
      userData.cart = [];

      await userData.save();

      return {status: 200, data: {message: 'Заказ сформирован'}};
    }

    return {status: 404, data: {message: 'Не найден пользователь'}};
  }

  async getOrders(userId) {
    try {
      const userData = await UserModel.findOne({_id: userId});
      if(userData) {

        return {status:200, data:{orders:userData.orders}};
      } else {
        return {status: 404, data: {message: 'Не найден пользователь'}};
      }
    } catch(e) {
      return {status: 500, data:{message: 'Произошла ошибка'}};
    }
  }
}

module.exports = new UserService();
