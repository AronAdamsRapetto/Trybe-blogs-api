const { userSchema } = require('./schemas');
const errorThrower = require('../../utils/errorThrower');

const validateUser = (user) => {
  const { error: joiError } = userSchema.validate(user);
  if (joiError) errorThrower(400, joiError.message);
};

module.exports = {
  validateUser,
};