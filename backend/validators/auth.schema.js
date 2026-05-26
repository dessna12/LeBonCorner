const Joi = require('joi')

const register = Joi.object({
  name:     Joi.string().min(2).max(100).required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

const login = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required(),
})

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
})

const resetPassword = Joi.object({
  token:    Joi.string().required(),
  password: Joi.string().min(8).required(),
})

module.exports = { register, login, forgotPassword, resetPassword }
