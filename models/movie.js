const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  tmdbId: {
    type: String,
    required: true
  },
  tmdbOverview: {
    type: String,
    required: true
  },
  tmdbPosterUrl: {
    type: String,
    required: true
  },
  tmdbBackdropUrl: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Movie', movieSchema, 'movies')