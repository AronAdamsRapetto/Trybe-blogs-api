const { categoriesService } = require('../services');

const registerCategory = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await categoriesService.registerCategory(name);

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  registerCategory,
};