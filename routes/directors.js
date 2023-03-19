const express = require('express')
const router = express.Router()
const Director = require('../models/director')

//Getting all directors
router.get('/', async (req, res) => {
    try {
        const directors = await Director.find()
        res.json(directors)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

//Getting one director
router.get('/:id', getdirector, (req, res) => {
    res.json(res.director)
})

//Creating a director
router.post('/', async (req, res) => {
    const director = new Director({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
      })
      try {
        const newDirector = await director.save()
        res.status(201).json(newDirector)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

//Updating a director
router.patch('/:id', getdirector, async (req, res) => {
    if (req.body.name != null) {
        res.director.name = req.body.name
      }
      if (req.body.email != null) {
        res.director.email = req.body.email
      }
      if (req.body.country != null) {
        res.director.country = req.body.country
      }
      try {
        const updatedDirector = await res.director.save()
        res.json(updatedDirector)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

router.delete('/:id', getdirector, async (req, res) => {
  try {
      await Director.deleteOne({_id: res.director._id})
      res.json({ message: 'Deleted director' })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

async function getdirector(req, res, next) {
    let director
    try {
      director = await Director.findById(req.params.id)
      if (director == null) {
        return res.status(404).json({ message: 'Cannot find the director' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.director = director
    next()
  }

module.exports = router