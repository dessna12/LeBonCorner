const mongoose = require('mongoose')


async function connect() {
  await mongoose.connect(process.env.MONGODB_URI) //Pensez à rajouter le nom de la db dans l'URI
  console.log('Connecté à MongoDB via mongoose')
}

module.exports = { connect }
