const { User } = require('../models');
const { validateUser } = require('./validations/validationUser');
const { generateToken } = require('../utils/JWT');
const errorThrower = require('../utils/errorThrower');

const registerUser = async (userInfo) => {
  validateUser(userInfo);

  const isAlreadyUserExist = await User.findOne({
    where: {
      email: userInfo.email,
    },
  });

  if (isAlreadyUserExist) errorThrower(409, 'User already registered');

  const { dataValues: newUser } = await User.create(userInfo);
  return generateToken(newUser);
};

const getAllUsers = async () => User.findAll({
  attributes: {
    exclude: ['password'],
  },
});

const getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) errorThrower(404, 'User does not exist');
  return user;
};

const removeUser = async ({ id }) => User.destroy({ where: { id } });

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  removeUser,
};