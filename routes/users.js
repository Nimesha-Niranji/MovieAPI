const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

//Getting one user
router.get('/:id', getuser, (req, res) => {
    res.json(res.user)
})

//Creating a user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
      })
      try {
        const newUser = await user.save()
        res.status(201).json(newUser)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

//Updating a user
router.patch('/:id', getuser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
      }
      if (req.body.email != null) {
        res.user.email = req.body.email
      }
      if (req.body.country != null) {
        res.user.country = req.body.country
      }
      try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

router.delete('/:id', getuser, async (req, res) => {
  try {
      await User.deleteOne({_id: res.user._id})
      res.json({ message: 'Deleted User' })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

async function getuser(req, res, next) {
    let user
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find the user' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

module.exports = router