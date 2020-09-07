const router = require('express').Router()
const User = require('../../models/User')

router.get('/', (req, res, next) => {
    User.find()
        .then(users =>{
            return res.status(200).json(users)
        })
})


module.exports = router
