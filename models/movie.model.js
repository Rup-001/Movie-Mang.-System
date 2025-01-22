// models/movie.model.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  title: { 
    type: String,
    required: true 
    },
  description: { 
    type: String 
    },
  released_at: { 
    type: Date
    },
  duration: { 
    type: String 
    },
  genre: { 
    type: String 
    },
  
  created_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    },
  avg_rating: { 
    type: Number, 
    default: 0 
    },
  total_rating: { 
    type: Number,
    default: 0 
    },
    language: { 
        type: String 
        },
  created_at: { 
    type: Date, 
    //default: Date.now 
    },
  updated_at: { 
    type: Date, 
    //default: Date.now 
    },
    reported: {
        type: Boolean,
        default: false,
        },
    reports: [
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true },
        reason: { 
            type: String, 
            required: true },
        reported_at: { 
            type: Date, 
            default: Date.now },
    },
    ],
});


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
