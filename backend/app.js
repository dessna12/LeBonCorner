const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/error.middleware.js')
require('dotenv').config();
const { connect } = require('./config/db.mongo.connect');
const cookieParser = require('cookie-parser')


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser())

// Connexion à MongoDB
connect().catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
  process.exit(1);
});

// Route de test
app.get('/api/test', (req, res) => {
  res.send('test');
});


app.use((req, res, next) => {
  console.log("URL reçue :", req.url);
  next();
});

// Routes
// const postRoutes = require('./routes/posts.route');
// const conversationRoute = require('../routes/conversation.route')
 const allRoutes = require('./routes/index.route.js')

// app.use('/api', postRoutes);
// app.use('/api', conversationRoute)
app.use('/api', allRoutes)


app.use(errorMiddleware)


module.exports = app;

