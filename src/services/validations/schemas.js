const Joi = require('joi');

// User fields Schemas
const displayNameSchema = Joi.string().min(8).required();
const emailSchema = Joi.string().email();
const passwordSchema = Joi.string().min(6).required();

const userSchema = Joi.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
  image: Joi.string(),
});

// Category field Schema
const nameSchema = Joi.string().required().messages({
  'any.required': '"name" is required',
  'string.empty': '"name" is required',
});

module.exports = {
  userSchema,
  nameSchema,
};