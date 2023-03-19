const express = require('express')
const router = express.Router()
const Actor = require('../models/actor')

//Getting all actors
router.get('/', async (req, res) => {
    try {
        const actors = await Actor.find()
        res.json(actors)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

//Getting one actor
router.get('/:id', getactor, (req, res) => {
    res.json(res.actor)
})

//Creating a actor
router.post('/', async (req, res) => {
    const actor = new Actor({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
      })
      try {
        const newActor = await actor.save()
        res.status(201).json(newActor)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

//Updating a actor
router.patch('/:id', getactor, async (req, res) => {
    if (req.body.name != null) {
        res.actor.name = req.body.name
      }
      if (req.body.email != null) {
        res.actor.email = req.body.email
      }
      if (req.body.country != null) {
        res.actor.country = req.body.country
      }
      try {
        const updatedActor = await res.actor.save()
        res.json(updatedActor)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

router.delete('/:id', getactor, async (req, res) => {
  try {
      await Actor.deleteOne({_id: res.actor._id})
      res.json({ message: 'Deleted actor' })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

async function getactor(req, res, next) {
    let actor
    try {
      actor = await Actor.findById(req.params.id)
      if (actor == null) {
        return res.status(404).json({ message: 'Cannot find the actor' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.actor = actor
    next()
  }

module.exports = router