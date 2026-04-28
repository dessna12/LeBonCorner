const AppError = require('./AppError')

class NotFoundError extends AppError{
  constructor(ressource = 'Ressource') {
    super(`${ressource} introuvable`, 404)
  }
}

module.exports = NotFoundError;

