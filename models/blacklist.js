const mongoose = require('mongoose')

const Blacklist = new mongoose.Schema({
    tocken: String,
    userId: String
}, {timestamps: true})

module.exports = mongoose.model('Blacklist', Blacklist)
