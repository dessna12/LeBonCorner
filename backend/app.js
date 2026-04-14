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
const postRoutes = require('./routes/post.route');
app.use('/api', postRoutes);


module.exports = app;

