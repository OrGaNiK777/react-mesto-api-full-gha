const host = 'localhost';

const { PORT = 4000 } = process.env;

const saltRounds = 10;

module.exports = {
  host, PORT, saltRounds,
};
