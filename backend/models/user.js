const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Email некорректный',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar) {
        return /^(http:|https:)\/\/w*\w/.test(avatar);
      },
      message: 'Ссылка некорректна',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
