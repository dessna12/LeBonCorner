const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { connect } = require('./config/db.mongo.connect');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Connexion à MongoDB
connect().catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
  process.exit(1);
});

// Route de test
app.get('/api/test', (req, res) => {
  res.send('test');
});

// Routes
// const postRoutes = require('./routes/posts.route');
// const conversationRoute = require('../routes/conversation.route')
 const allRoutes = require('./routes/index.route.js')

// app.use('/api', postRoutes);
// app.use('/api', conversationRoute)
app.use('/api', allRoutes)


app.use((err, req, res, next) => {
  res.status(err.status).send(err.message)
})

module.exports = app;

