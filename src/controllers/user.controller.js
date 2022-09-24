const { userService } = require('../services');

const registerUser = async (req, res) => {
  const { body } = req;

  const { type, message } = await userService.registerUser(body);

  if (type) return res.status(type).json({ message });
  return res.status(201).json({ token: message });
};

module.exports = {
  registerUser,
};