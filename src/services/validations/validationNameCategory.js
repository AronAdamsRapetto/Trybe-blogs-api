const { nameSchema } = require('./schemas');

const validationName = (name) => {
  const { error: joiError } = nameSchema.validate(name);

  if (joiError) {
    const error = {
      statusCode: 400,
      message: joiError.message,
    };
    throw error;
  }
};

module.exports = validationName;