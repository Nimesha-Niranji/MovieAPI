require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const moviesRouter = require('./routes/movies')
app.use('/movies', moviesRouter)

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const actorsRouter = require('./routes/actors')
app.use('/actors', actorsRouter)


const directorsRouter = require('./routes/directors')
app.use('/directors', directorsRouter)

app.listen(3000, () => console.log('Server Started'))