const express = require('express');

const saleController = require('../controllers/saleController');
// const validateToken = require('../middlewares/validateToken');

const salesRoute = express.Router();

salesRoute.post('/orders', saleController.createSale);

salesRoute.get('/orders', saleController.getAllSales);

module.exports = salesRoute;