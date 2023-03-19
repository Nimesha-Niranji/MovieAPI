const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: string, required: true },
    country : { type: String, required: true },
    telephone: Number,
})

module.exports = mongoose.model('User', userSchema)