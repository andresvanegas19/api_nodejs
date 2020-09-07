const router = require('express').Router()

router.get('/', (req, res, next) => {
    return res.status(200).json({msg: 'User end point'})
})


module.exports = router
