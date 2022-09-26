const { nameSchema } = require('./schemas');
const errorThrower = require('../../utils/errorThrower');

const validationName = (name) => {
  const { error: joiError } = nameSchema.validate(name);
  if (joiError) errorThrower(400, joiError.message);
};

module.exports = validationName;