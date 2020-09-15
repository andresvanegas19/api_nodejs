const mongoose = require('mongoose')
const { uuid } = require('uuidv4')
const findOrCreate = requier('mongoose-findorcreate')

const User = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  username: String,
  twitterId: String,
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  perferences: mongoose.SchemaTypes.Mixed
}, {timestamps: true})

User.plugin(require('passport-local-mongoose'))
User.plugin(findOrCreate)

module.exports = mongoose.model('User', User)
