const TokenService = require('../services/token-service');

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization; // получаем из заголовка поле авторизации
    if (!authorizationHeader) {
      // если нет заголовка
      return res.status(401).json({message: 'Пользователь не авторизован', reason: 'Нет заголовка'});
    }

    const accessToken = authorizationHeader.split(' ')[1]; // из строки Bearer токеном получаем сам токен
    if (!accessToken) {
      // если нет токена
      return res.status(401).json({message: 'Пользователь не авторизован', reason: 'Не удалось получить аксесс токен'});
    }

    const user = TokenService.validateAccessToken(accessToken);
    if (!user) {
      // сравниваем полученный аксесс токен с тем, что был сгенерирован ранее
      return res.status(401).json({message: 'Пользователь не авторизован', reason: 'Аксесс токен не прошел валидацию'});
    }
    // создаем новое поле в request
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({message: 'Пользователь не авторизован'});
  }
};
