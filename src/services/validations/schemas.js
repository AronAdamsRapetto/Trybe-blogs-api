const Joi = require('joi');

const displayNameSchema = Joi.string().min(8).required();
const emailSchema = Joi.string().email();
const passwordSchema = Joi.string().min(6).required();

const userSchema = Joi.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
  image: Joi.string(),
});

module.exports = {
  userSchema,
};