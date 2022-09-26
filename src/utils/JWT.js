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

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;  
  } catch (err) {
    const error = {
      statusCode: 401,
      message: 'Expired or invalid token',
    };
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};