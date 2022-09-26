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
  const { type, message } = await userService.getUserById(id);

  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const removeUser = async (req, res) => {
  const { user } = req;

  const { type, message } = await userService.removeUser(user);

  if (type) return res.status(type).json({ message });
  return res.status(204).json();
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  removeUser,
};