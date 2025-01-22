const express = require("express");
const reportRoute = express.Router();
const reportController = require ('../controllers/report.controller')
const passport = require('../config/passportConfig');

const isAdmin = require('../middleware/isAdmin');
const isUser = require('../middleware/isUser');
const unauthorized = require('../middleware/isUnauthorized');

reportRoute.post('/:movieId', unauthorized,  reportController.reportMovie)

reportRoute.get('/', unauthorized, isAdmin,  reportController.getReportedMovies)

reportRoute.post('/:movieId/action', unauthorized, isAdmin,  reportController.handleMovieReport)








module.exports = reportRoute;