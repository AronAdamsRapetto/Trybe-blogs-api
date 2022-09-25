const { User } = require('../models');
const { validateUser } = require('./validations/validationUser');
const { generateToken } = require('../utils/JWT');

const registerUser = async (userInfo) => {
  const validation = validateUser(userInfo);

  if (validation.type) return validation;

  const isAlreadyUserExist = await User.findOne({
    where: {
      email: userInfo.email,
    },
  });

  if (isAlreadyUserExist) return { type: 409, message: 'User already registered' };  
  const { dataValues: newUser } = await User.create(userInfo);

  const token = generateToken(newUser);
  return { type: null, message: token };
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

  if (!user) return { type: 404, message: 'User does not exist' };
  return { type: null, message: user };
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