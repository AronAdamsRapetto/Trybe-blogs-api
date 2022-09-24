const { nameSchema } = require('./schemas');

const validationName = (name) => {
  const { error } = nameSchema.validate(name);
  console.log(error);

  if (error) return { type: 400, message: error.message };
  return { type: null, message: '' };
};

module.exports = validationName;