const express = require("express");
const movieRoute = express.Router();
const movieController = require ('../controllers/movie.controller')

const isAdmin = require('../middleware/isAdmin');
const isUser = require('../middleware/isUser');
const unauthorized = require('../middleware/isUnauthorized');

movieRoute.get('/', unauthorized,  movieController.movieHome)

movieRoute.post('/create-movie', unauthorized,  movieController.createMovie)

movieRoute.get('/details/:movieId', unauthorized,  movieController.getMovieDetails)

movieRoute.put('/update/:movieId', unauthorized,  movieController.updateMovie)

movieRoute.post('/rate/:movieId', unauthorized, movieController.rateMovie);





module.exports = movieRoute;