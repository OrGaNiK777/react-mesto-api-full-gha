const NotAuthError = require('../errors/not-auth-error');
const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = verifyToken(authorization);
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
