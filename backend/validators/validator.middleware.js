// Factory : reçoit un schéma Joi, retourne un middleware Express
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      const messages = error.details.map(d => d.message)
      return res.status(400).json({ message: 'Données invalides', errors: messages })
    }

    next()
  }
}

module.exports = validate