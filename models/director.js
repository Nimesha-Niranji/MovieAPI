const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    country : { type: String, required: true },
    created_films : Number,
})

module.exports = mongoose.model('Director', directorSchema)