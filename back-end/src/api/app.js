const express = require('express');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.json());

app.use('/login', userRoutes);

module.exports = app;
