const express = require('express');

const saleController = require('../controllers/saleController');
// const validateToken = require('../middlewares/validateToken');

const salesRoute = express.Router();

salesRoute.post('/orders', saleController.createSale);

salesRoute.get('/orders/:id', saleController.getSaleById);

salesRoute.get('/orders', saleController.getAllSales);

salesRoute.put('/orders/:id', saleController.updateStatus);

module.exports = salesRoute;
