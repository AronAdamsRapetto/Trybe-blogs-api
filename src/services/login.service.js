const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const verifyLogin = (user) => {
  if (!user) {
    // const error = {
    //   statusCode: 400,
    //   message: 'Invalid fields',
    // };
    // throw error;
    return { type: 400, message: 'Invalid fields' };
  }
  return { type: null, message: '' };
};

const login = async ({ email, password }) => {  
  if (!email || !password) {
    // const error = {
    //   statusCode: 400,
    //   message: 'Some required fields are missing',
    // };
    // throw error;
    return { type: 400, message: 'Some required fields are missing' };
  }

  const user = await User.findOne({
    where: {
      email, password,
    },
  });
  
  const validateLogin = verifyLogin(user);
  if (validateLogin.type) return validateLogin;

  const token = generateToken(user);
  return { type: null, message: token };
};

module.exports = {
  login,
};