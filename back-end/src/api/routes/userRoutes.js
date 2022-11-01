const express = require('express');

const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLogin');

const userRoutes = express.Router();

userRoutes.post('/', validateLogin, userController.login);

module.exports = userRoutes;
