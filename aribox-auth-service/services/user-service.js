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
      const exists = await UserModel.findOne({email});

      if(!exists) {
        // если пользователя с таким email нет в системе
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        await MailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/activate/${activationLink}`);
        const user = await UserModel.create({email, name, password: hashPassword, activationLink});
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
   * @returns {Promise<{message: string, status: number}|{userData: UserDto, status: number}>}
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
        return {status: 200, data: {message: 'Авторизация прошла успешно', userData}};
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
   * @returns {Promise<void>}
   */
  async logout(email) {
    try {
      const userData = await UserModel.findOne({email});
      await TokenService.deleteRefreshToken(userData._id)
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
      return {status: 401, data: {message: 'Пользователь не авторизован'}};
    }

    const validation = TokenService.validateRefreshToken(refreshToken);
    const tokenData = await TokenService.findRefreshToken(refreshToken);

    if(!tokenData || !validation) {
      return {status: 401, data: {message: 'Пользователь не авторизован'}};
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
}

module.exports = new UserService();
