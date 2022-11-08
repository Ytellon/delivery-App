const { Router } = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRouter = Router();

sellerRouter.get('/sellers', sellerController.getAllSellers);

module.exports = sellerRouter;
