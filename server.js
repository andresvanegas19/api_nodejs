const express = require('express')
const helmet = require('helmet')

const app = express()

const port = process.env.PORT || 3000
const server = require('http').Server(app)

server.listen(port)
