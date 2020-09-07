const router = require('express').Router()

// /api/user
router.use('/user', require('./user'))

// /api/item
router.use('/item', require('./item'))

module.exports = router
