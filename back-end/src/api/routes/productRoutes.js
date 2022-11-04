const express = require('express');
const prodcutController = require('../controllers/productController');
const validateToken = require('../middlewares/validateToken');

const productRoutes = express.Router();

productRoutes.get('/products', validateToken, prodcutController.getAllProducts);

module.exports = productRoutes;
