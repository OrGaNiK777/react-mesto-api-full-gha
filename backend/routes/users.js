const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getUsers,
  getUsersById,
  patchUserById,
  patchAvatarById,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUsersById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUserById);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(
      (value) => {
        if (validator.isURL(value)) {
          return value;
        }
        throw new Error('Ссылка некорректна');
      },
    ),
  }),
}), patchAvatarById);

module.exports = router;
