const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    created_at: { type: Date, default: Date.now },
  });
  
  const Rating = mongoose.model('Rating', ratingSchema);
  module.exports = Rating;
  