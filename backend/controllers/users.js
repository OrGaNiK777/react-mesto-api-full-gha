const httpConstants = require('http2').constants;
const bcrypt = require('bcrypt');

const User = require('../models/user');

const { generateToken } = require('../utils/jwt');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotAuthError = require('../errors/not-auth-error');

const { saltRounds } = require('../utils/consctants');

const getUsers = (req, res, next) => User.find({})
  .then((user) => res.status(httpConstants.HTTP_STATUS_OK)
    .send(user)).catch(next);

function getCurrentUser(req, res, next) {
  const { id } = req.user;
  User.findById(id)
    .orFail(new NotFoundError(`Пользователь c id: ${id} не найден`))
    .then((user) => { res.status(httpConstants.HTTP_STATUS_OK).send(user); })
    .catch(next);
}

const getUsersById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError(`Пользователь c id: ${req.params.id} не найден`))
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictError(`Пользователь с Email ${req.body.email} уже существует`));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new NotAuthError('Пользователь не найден'));
      }
      return bcrypt.compare(password, user.password, (err, result) => {
        if (!result) { next(new NotAuthError('Не верный email или пароль')); } else {
          const token = generateToken(user._id);
          res.status(httpConstants.HTTP_STATUS_OK).send({ token });
        }
      });
    });
};

const patchUserById = (req, res, next) => {
  const newUser = req.body;
  const { id } = req.user;
  return User.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError(`Пользователь по id  ${req.user._id} не найден`))
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(' and ')}`));
      }
      return next(err);
    });
};

const patchAvatarById = (req, res, next) => {
  const newUser = req.body;
  const { id } = req.user;
  return User.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors)}`));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUsersById,
  patchUserById,
  patchAvatarById,
  login,
  getCurrentUser,
};
