const { Category } = require('../models');
const validationName = require('./validations/validationNameCategory');

const registerCategory = async (name) => {
  validationName(name);

  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => Category.findAll();

module.exports = {
  registerCategory,
  getAllCategories,
};