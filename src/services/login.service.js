const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const verifyLogin = (user) => {
  if (!user) {
    const error = {
      statusCode: 400,
      message: 'Invalid fields',
    };
    throw error;
  }
};

const login = async ({ email, password }) => {  
  if (!email || !password) {
    const error = {
      statusCode: 400,
      message: 'Some required fields are missing',
    };
    throw error;
  }

  const user = await User.findOne({
    where: {
      email, password,
    },
  });

  verifyLogin(user);

  return generateToken(user);
};

module.exports = {
  login,
};