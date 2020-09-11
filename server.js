const express = require('express')
const mongoose = require('mongoose')
// This is for security
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const morgan = require('morgan')


const app = express()
app.use(helmet())
const router = express.Router()

mongoose.Promise = global.Promise
mongoose.connect(process.env.dbURL || 'mongodb://core-db:27017/core', {useNewUrlParser: true})

const port = process.env.PORT || 3000
const server = require('http').Server(app)

app.use(cookieParser())
app.use(bodyParser.json())
// Allow to add a middleware to acces
app.use(passport.initialize())
app.use(morgan('dev'))
app.use(router)

app.use('/api', require('./routes'))



server.listen(port)
