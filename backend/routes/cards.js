const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCardById,
  deleteLikesCardById,
  putLikesCardById,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(
      (value) => {
        if (validator.isURL(value)) {
          return value;
        }
        throw new Error('Ссылка некорректна');
      },
    ),
  }),
}), createCard);

router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteCardById);

router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteLikesCardById);

router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), putLikesCardById);

module.exports = router;
