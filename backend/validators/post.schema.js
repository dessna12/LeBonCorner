const Joi = require('joi')

const create = Joi.object({
  title:       Joi.string().min(3).max(150).required(),
  description: Joi.string().max(2000).optional(),
  price:       Joi.number().min(0).optional(),
  location:    Joi.string().max(150).optional(),
  category_id: Joi.number().integer().optional(),
})

// Pour la mise à jour : tous les champs sont optionnels,
// mais au moins un doit être présent
const update = Joi.object({
  title:       Joi.string().min(3).max(150),
  description: Joi.string().max(2000),
  price:       Joi.number().min(0),
  location:    Joi.string().max(150),
  category_id: Joi.number().integer(),
}).min(1)

module.exports = { create, update }
