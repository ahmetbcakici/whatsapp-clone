import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
  surname: Joi.string().min(3).max(25).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required()
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
})

export const emailVerificationSchema = Joi.object({
  code: Joi.number().required(),
  toke: Joi.string().required()
})