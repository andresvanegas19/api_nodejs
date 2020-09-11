const router = require('express').Router()

// / create a rout to registetion
router.use('/auth', require('./auth'))

// /api/user
router.use('/user', require('./user'))

// /api/item
router.use('/item', require('./item'))


router.use('/item', require('./middleware/authorizer'))

module.exports = router
