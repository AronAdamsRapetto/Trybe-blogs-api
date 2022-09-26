const { User } = require('../models');
const { validateUser } = require('./validations/validationUser');
const { generateToken } = require('../utils/JWT');

const registerUser = async (userInfo) => {
  validateUser(userInfo);

  const isAlreadyUserExist = await User.findOne({
    where: {
      email: userInfo.email,
    },
  });

  if (isAlreadyUserExist) {
    const error = {
      statusCode: 409,
      message: 'User already registered',
    };
    throw error;
  }

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

  if (!user) {
    const error = {
      statusCode: 404, message: 'User does not exist',
    };
    throw error;
  }
  return user;
};

const removeUser = async ({ id }) => {
  const isRemoved = await User.destroy({ where: { id } });

  if (isRemoved) return { type: null, message: '' };
  return { type: 500, message: 'Algo deu errado!' };
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  removeUser,
};