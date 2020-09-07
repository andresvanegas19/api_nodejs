const router = require('express').Router()
const Item = require('../../models/Item')


router.put('/:id', (req, res, next) =>  {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(updatedItem =>{
            res.status(200).json(updatedItem)
        })
        .catch(err => {
            console.log('erro updateing Item:', err)
            return res.status(500).json({msg: "Failed to update"})
        })
})

module.exports = router
