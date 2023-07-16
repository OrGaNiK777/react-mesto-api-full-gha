const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

const verifyToken = (token) => jwt.verify(token.replace('Bearer ', ''), NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
module.exports = { generateToken, verifyToken };
