const express = require("express");
const authRouter = express.Router();
const authController = require ('../controllers/auth.controller')
const isAdmin = require('../middleware/isAdmin');
const isUser = require('../middleware/isUser');
const unauthorized = require('../middleware/isUnauthorized');

authRouter.get('/', authController.home)
authRouter.post('/login', authController.loginUser)
authRouter.post('/registration', authController.registrationUser)


module.exports = authRouter;