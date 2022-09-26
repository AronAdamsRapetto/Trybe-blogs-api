const { userService } = require('../services');

const registerUser = async (req, res) => {
  const { body } = req;

  const token = await userService.registerUser(body);
  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);
  return res.status(200).json(user);
};

const removeUser = async (req, res) => {
  const { user } = req;

  await userService.removeUser(user);
  return res.status(204).json();
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  removeUser,
};