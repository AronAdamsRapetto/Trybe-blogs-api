require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = ({ id, displayName, image }) => {
  const payload = {
    id, displayName, image,
  };

  const config = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(payload, secret, config);
};

module.exports = {
  generateToken,
};