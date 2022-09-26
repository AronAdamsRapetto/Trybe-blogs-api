const { User } = require('../models');
const { generateToken } = require('../utils/JWT');
const errorThrower = require('../utils/errorThrower');

const verifyLogin = (user) => {
  if (!user) errorThrower(400, 'Invalid fields');
};

const login = async ({ email, password }) => {  
  if (!email || !password) errorThrower(400, 'Some required fields are missing');

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