const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi, errors } = require('celebrate');

const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).trim(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(
      (value) => {
        if (validator.isURL(value)) {
          return value;
        }
        throw new Error('Ссылка некорректна');
      },
    ),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), login);

router.use(errors());

module.exports = router;
