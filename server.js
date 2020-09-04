const express = require('express')
const helmet = require('helmet')
// mongoose is a ORM to help with comunicate to database

const app = express()

const port = process.env.PORT || 3000
const server = require('http').Server(app)

server.listen(port)

