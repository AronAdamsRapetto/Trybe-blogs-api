const { Category } = require('../models');
const validationName = require('./validations/validationNameCategory');

const registerCategory = async (name) => {
  const validate = validationName(name);

  if (validate.type) return validate;

  const newCategory = await Category.create({ name });
  return { type: null, message: newCategory };
};

module.exports = {
  registerCategory,
};