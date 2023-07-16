const httpConstants = require('http2').constants;

module.exports = (error, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode)
    // проверяем статус и выставляем сообщение в зависимости от него
    .send({ message: statusCode === httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'Произошла ошибка сервера' : message });
  // eslint-disable-next-line no-console
  console.log(statusCode);
  return next();
};
