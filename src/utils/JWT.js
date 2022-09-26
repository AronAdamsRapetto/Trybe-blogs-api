require('dotenv').config();
const jwt = require('jsonwebtoken');
const errorThrower = require('./errorThrower');

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

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;  
  } catch (err) {
    errorThrower(401, 'Expired or invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};