const host = 'api.mesto.organik.nomoredomains.xyz';

const { PORT = 3000 } = process.env;

const saltRounds = 10;

module.exports = {
  host, PORT, saltRounds,
};
