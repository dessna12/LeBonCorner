const Joi = require('joi')

const register = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min':     'Le nom doit contenir au moins 2 caractères',
    'string.max':     'Le nom ne peut pas dépasser 100 caractères',
    'any.required':   'Le nom est obligatoire',
  }),
  email: Joi.string().email().required().messages({
    'string.email':   "L'adresse email n'est pas valide",
    'any.required':   "L'email est obligatoire",
  }),
  password: Joi.string().min(8).required().messages({
    'string.min':     'Le mot de passe doit contenir au moins 8 caractères',
    'any.required':   'Le mot de passe est obligatoire',
  }),
})

const login = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email':   "L'adresse email n'est pas valide",
    'any.required':   "L'email est obligatoire",
  }),
  password: Joi.string().required().messages({
    'any.required':   'Le mot de passe est obligatoire',
  }),
})

const forgotPassword = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email':   "L'adresse email n'est pas valide",
    'any.required':   "L'email est obligatoire",
  }),
})

const resetPassword = Joi.object({
  token:    Joi.string().required(),
  password: Joi.string().min(8).required().messages({
    'string.min':     'Le mot de passe doit contenir au moins 8 caractères',
    'any.required':   'Le mot de passe est obligatoire',
  }),
})

module.exports = { register, login, forgotPassword, resetPassword }
