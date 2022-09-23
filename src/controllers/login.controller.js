const { loginService } = require('../services');

const login = async (req, res) => {
  const { body } = req;

  const { type, message } = await loginService.login(body);
  
  if (type) return res.status(type).json({ message });
  res.status(200).json({ token: message });
};

module.exports = {
  login,
};