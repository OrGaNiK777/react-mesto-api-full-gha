const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(link) {
          return /^(https|http):\/\/(www)?[^ "]+/gim.test(link);
        },
        message: 'Ссылка некорректна',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
]);

module.exports = mongoose.model('card', cardSchema);
