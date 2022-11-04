const express = require('express');

const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLogin');
const validateToken = require('../middlewares/validateToken');
const adminAuth = require('../middlewares/adminAuth');

const userRoutes = express.Router();

userRoutes.post('/login', validateLogin, userController.login);

userRoutes.post('/register', userController.createUser);

userRoutes.get('/users', validateToken, adminAuth, userController.getAllUsers);

module.exports = userRoutes;
