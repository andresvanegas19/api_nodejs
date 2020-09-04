const express = require('express')
const helmet = require('helmet')

const app = express()

const port = process.env.PORT || 3000
const server = requere('http').Server(app)

server.listen(port)
