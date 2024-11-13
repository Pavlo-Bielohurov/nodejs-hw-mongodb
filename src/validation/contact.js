import Joi from 'joi';

import { contactType } from '../constants/contact.js';

export const contactAddShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string()
    .min(9)
    .max(15)
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/)
    .required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactType),
});

export const contactUpdateShema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/,
  ),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactType),
});
