const router = require('express').Router();
const authRouter = require('../middlewares/auth');
const cardsRoutes = require('./cards');
const usersRoutes = require('./users');
const authUsersRouter = require('./authUsers');
const NotFoundError = require('../errors/not-found-error');

router.use(authUsersRouter);

router.use(authRouter);

router.use(cardsRoutes);

router.use(usersRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

module.exports = router;
