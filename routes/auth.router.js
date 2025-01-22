const express = require("express");
const authRouter = express.Router();
const authController = require ('../controllers/auth.controller')
const passport = require('../config/passportConfig');
const isAdmin = require('../middleware/isAdmin');
const isUser = require('../middleware/isUser');
const unauthorized = require('../middleware/isUnauthorized');

authRouter.post('/', authController.loginUser)
authRouter.post('/registration', authController.registrationUser)


module.exports = authRouter;