const { Router } = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRouter = Router();

sellerRouter.get('/seller', sellerController.getAllSellers);

module.exports = sellerRouter;
