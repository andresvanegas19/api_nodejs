const mongoose = require('mongoose')
const { uuid } = require('uuidv4')

const User = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  username: String,
  perferences: mongoose.SchemaTypes.Mixed
}, {timestamps: true})


module.exports = mongoose.model('User', User)
