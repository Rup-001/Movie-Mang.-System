const Movie = require('../models/movie.model');
const User = require('../models/user.model');
const Rating = require('../models/rating.model'); 

exports.movieHome = async (req, res) => {
    try {
      // Fetch all movies from the database
      const movies = await Movie.find();
  
      // Send the list of movies as a JSON response
      res.status(200).json({
        success: true,
        movies,
      });
    } catch (error) {
      // Handle any errors
      res.status(500).json({
        success: false,
        message: 'Failed to fetch movies',
        error: error.message,
      });
    }
  };

// Create a new movie (Only authenticated users)
exports.createMovie = async (req, res) => {
  const { title, description, released_at, duration, genre, language } = req.body;
  try {
    const newMovie = new Movie({
      title,
      description,
      released_at,
      duration,
      genre,
      language,
      created_at: Date.now(),
      created_by: req.user.id 
    });
    await newMovie.save();
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
  } catch (err) {
    res.status(500).json({ message: 'Error creating movie' });
  }
};


exports.getMovieDetails = async (req, res) => {
    
    try {
        const movieId  = req.params.movieId;
      const movie = await Movie.findById(movieId)
        .populate('created_by', 'username')
        .populate('ratings.user', 'username');
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching movie details' });
    }
  };


  exports.updateMovie = async (req, res) => {
    const movieId  = req.params.movieId;
    const { title, description, released_at, duration, genre, language } = req.body;
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) {

        return res.status(404).json({ message: 'Movie not found' });
      }
  
      if (movie.created_by.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this movie' });
      }

      movie.title = title || movie.title;
      movie.description = description || movie.description;
      movie.released_at = released_at || movie.released_at;
      movie.duration = duration || movie.duration;
      movie.genre = genre || movie.genre;
      movie.language = language || movie.language;
      movie.updated_at = Date.now(); // Update only when movie is edited
  
      await movie.save();
      res.status(200).json({ message: 'Movie updated successfully', movie });
    } catch (err) {
      res.status(500).json({ message: 'Error updating movie' });
    }
  };


  exports.rateMovie = async (req, res) => {
    const movieId = req.params.movieId;
    const { rating } = req.body;
  
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
  
    try {
      // Find the movie
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      // Check if the user has already rated the movie
      let existingRating = await Rating.findOne({ user: req.user.id, movie: movieId });
      
      if (existingRating) {

        existingRating.rating = rating;
        await existingRating.save();

      } else {
        // Create new rating
        await Rating.create({ user: req.user.id, movie: movieId, rating });
  
        // Increment total rating count
        movie.total_rating += 1;
      }
  
      // Recalculate the average rating based on all ratings
      const ratings = await Rating.find({ movie: movieId });
      const totalRatings = ratings.length;
      const sumRatings = ratings.reduce((acc, r) => acc + r.rating, 0);
      
      if (totalRatings > 0) {
        movie.avg_rating = sumRatings / totalRatings;
      } else {
        movie.avg_rating = 0; // No ratings yet
      }
  
      // Save updated movie data
      await movie.save();
      res.status(200).json({
         message: 'Movie rated successfully', 
         avg_rating: movie.avg_rating, 
         total_rating: movie.total_rating 
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error rating movie' });
    }
  };
  