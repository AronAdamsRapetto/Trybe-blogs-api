const { userSchema } = require('./schemas');

const validateUser = (user) => {
  const { error: joiError } = userSchema.validate(user);
  if (joiError) {
    const error = {
      statusCode: 400,
      message: joiError.message,
    };
    throw error;
  }
};

module.exports = {
  validateUser,
};