const { categoriesService } = require('../services');

const registerCategory = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await categoriesService.registerCategory(name);

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoriesService.getAllCategories();
  return res.status(200).json(categories);
};

module.exports = {
  registerCategory,
  getAllCategories,
};