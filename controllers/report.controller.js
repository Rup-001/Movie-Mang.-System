const Movie = require('../models/movie.model');
const User = require('../models/user.model');

  exports.reportMovie = async (req, res) => {
    const { movieId } = req.params;
    const { reason } = req.body;
  
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      // Check if the user has already reported this movie
      const alreadyReported = movie.reports.some(r => r.user.toString() === req.user.id);
      if (alreadyReported) {
        return res.status(400).json({ message: 'You have already reported this movie' });
      }
  
      // Add the report
      movie.reports.push({ user: req.user.id, reason });
      movie.reported = true;
      await movie.save();
  
      res.status(200).json({ message: 'Movie reported successfully', movie });
    } catch (err) {
        console.error( error )
      res.status(500).json({ message: 'Error reporting movie', error: err.message });
    }
  };


  exports.getReportedMovies = async (req, res) => {
    try {
      const reportedMovies = await Movie.find({ reported: true }).populate('reports.user', 'name email');
      res.status(200).json(reportedMovies);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reported movies', error: err.message });
    }
  };

exports.handleMovieReport = async (req, res) => {
    const { movieId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'
  
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      if (action === 'approve') {
        // Admin approves the report: Take action like removing the movie
        await movie.deleteOne();
        return res.status(200).json({ message: 'Movie removed after approving the report' });
      } else if (action === 'reject') {
        // Admin rejects the report: Clear reports
        movie.reported = false;
        movie.reports = [];
        await movie.save();
        return res.status(200).json({ message: 'Reports rejected and cleared' });
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error handling report', error: err.message });
    }
  };
  