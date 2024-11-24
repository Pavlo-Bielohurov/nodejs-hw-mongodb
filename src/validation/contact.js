import Joi from 'joi';

import { contactType } from '../constants/contact.js';

export const CreateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `Name should be a type of 'text'`,
    'string.empty': `Name cannot be an empty field`,
    'string.min': `Name should have a minimum length of {#limit}`,
    'string.max': `Name should have a maximum length of {#limit}`,
    'any.required': `Name is a required field`,
  }),
  phoneNumber: Joi.string()
    .min(9)
    .max(15)
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/)
    .required()
    .messages({
      'string.pattern.base': `Phone number must be a valid format`,
      'string.min': `Phone number should have a minimum length of {#limit}`,
      'string.max': `Phone number should have a maximum length of {#limit}`,
      'any.required': `Phone number is a required field`,
    }),
  email: Joi.string().email().messages({
    'string.email': `Email must be a valid email address`,
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': `isFavourite must be a boolean`,
  }),
  contactType: Joi.string()
    .valid(...contactType)
    .messages({
      'any.only': `Contact type must be one of ${contactType.join(', ')}`,
    }),
});

export const UpdateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': `Name should be a type of 'text'`,
    'string.min': `Name should have a minimum length of {#limit}`,
    'string.max': `Name should have a maximum length of {#limit}`,
  }),
  phoneNumber: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/)
    .messages({
      'string.pattern.base': `Phone number must be a valid format`,
    }),
  email: Joi.string().email().messages({
    'string.email': `Email must be a valid email address`,
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': `isFavourite must be a boolean`,
  }),
  contactType: Joi.string()
    .valid(...contactType)
    .messages({
      'any.only': `Contact type must be one of ${contactType.join(', ')}`,
    }),
});
