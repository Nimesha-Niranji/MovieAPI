const mongoose = require('mongoose')

const actorSchema = new mongoose.Schema({
    name : { type: String, required: true },
    year: { type: string, required: true },
    country: { type: String, required: true },
    no_of_films : Number,
})

module.exports = mongoose.model('Actor', actorSchema)