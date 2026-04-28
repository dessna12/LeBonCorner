function errorMiddleware(err, req, res, next) {
  const status = err.status || 500
  const message = err.message || 'Errreur serveur'

  if(process.env.NODE_ENV === 'developement') {
    response.stack = err.stack

    
    console.log(err)
  } else {
    // Ecriture fichier de logs en production 
  }
   
  const response = { error : message}
  res.status(status).json(response)

}

module.exports = errorMiddleware;