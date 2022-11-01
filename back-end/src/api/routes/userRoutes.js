const express = require('express');

const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLogin');

const userRoutes = express.Router();

userRoutes.post('/', validateLogin, userController.login);

userRoutes.post('/register', userController.createUser);

module.exports = userRoutes;
