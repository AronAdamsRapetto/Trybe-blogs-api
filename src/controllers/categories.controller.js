const { categoriesService } = require('../services');

const registerCategory = async (req, res) => {
  const { name } = req.body;
  
  const newCategory = await categoriesService.registerCategory(name);
  
  return res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoriesService.getAllCategories();
  return res.status(200).json(categories);
};

module.exports = {
  registerCategory,
  getAllCategories,
};