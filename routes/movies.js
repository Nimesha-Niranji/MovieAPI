const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

//Getting all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

//Getting one movie
router.get('/:id', getmovie, (req, res) => {
    res.json(res.movie)
})

//Creating a movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        director: req.body.director
      })
      try {
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

//Updating a movie
router.patch('/:id', async (req, res) => {

})

//Deleting a movie
router.delete('/:id', async (req, res) => {

})

async function getmovie(req, res, next) {
    let movie
    try {
      movie = await Movie.findById(req.params.id)
      if (movie == null) {
        return res.status(404).json({ message: 'Cannot find the movie' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.movie = movie
    next()
  }

module.exports = router