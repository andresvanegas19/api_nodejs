const router = require('express').Router()
const Item = require('../../models/Item')

router.get('/', (req, res, next) => {
    Item.find()
    .then(items =>{
       return res.status(200).json(items)
    })
})


module.exports = router
