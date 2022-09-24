const { userService } = require('../services');

const registerUser = async (req, res) => {
  const { body } = req;

  const { type, message } = await userService.registerUser(body);

  if (type) return res.status(type).json({ message });
  return res.status(201).json({ token: message });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

// const getUserById = async (req, res) => {};

module.exports = {
  registerUser,
  getAllUsers,
  // getUserById,
};