const express = require('express')
const router = express.Router()
const Movie = require('../models/movieModel')

//Getting all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(Movie)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

//Getting one movie
router.get('/:id', (req, res) => {

})

//Creating a movie
router.post('/', async (req, res) => {

})

//Updating a movie
router.patch('/:id', async (req, res) => {

})

//Deleting a movie
router.delete('/:id', async (req, res) => {

})

module.exports = router