const express = require('express');
const error = require('../error/AppError');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(saleRoutes);
app.use(express.static('public'));
app.use(error);

module.exports = app;
