const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model')

class TokenService {
  /**
   * генерация токенов
   * @param payload
   * @returns {{accessToken: (*), refreshToken: (*)}}
   */
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10s'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'});

    return {accessToken, refreshToken};
  }

  /**
   * валидация аксесс токена
   * @param token
   * @returns {null|*}
   */
  validateAccessToken(token) {
    try{
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch(e) {
      console.log(e);
      return null;
    }
  }

  /**
   * валидация рефреш токена
   * @param token
   * @returns {null|*}
   */
  validateRefreshToken(token) {
    try{
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch(e) {
      console.log(e);
      return null;
    }
  }

  /**
   * сохранение рефреш токена в бд
   * @param userId
   * @param refreshToken
   * @returns {Promise<any>}
   */
  async saveToken(userId, refreshToken) {
    try {
      const tokenData = await TokenModel.findOne({user: userId})
      if (tokenData) {
        // если уже есть токен у пользователя с id =  userId
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      }

      // если нет, то создать
      return await TokenModel.create({user: userId, refreshToken});
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * удаление рефреш токена из бд
   * @param user
   * @returns {Promise<void>}
   */
  async deleteRefreshToken(user) {
    try {
      await TokenModel.deleteOne({user});
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * поиск рефреш токена в бд
   * @param refreshToken
   * @returns {Promise<*>}
   */
  async findRefreshToken(refreshToken) {
    try {
      return await TokenModel.findOne({refreshToken});
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new TokenService();
