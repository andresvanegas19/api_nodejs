const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')



const app = express()

mongoose.Promise = global.Promise
mongoose.connect(
    process.env.dbURL || 'mongodb://core-db:27017/core',
    {userNewUrlParses: true})


const port = process.env.PORT || 3000
// mongoose is a ORM to help with comunicate to database
const server = require('http').Server(app)

server.listen(port)

