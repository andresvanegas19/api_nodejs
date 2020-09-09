const router = require('express').Router()
const Item = require('../../models/Item')
const validator = require('validator')


router.put('/:id', (req, res, next) =>  {
    const itemId = validator.escape(req.params.id)
    if (!validator.isUUID(itemId))
    {
        return res.status(400).json({msg: "Invalid Id"})
    }
    const escpQuery = Object.assign({},
        // copies all enumerable own properties from one or more
        // source objects to a target object. It returns the target object.
        ...Object.keys(req.body).map(obKey => {
            return {[obKey]: validator.escape(req.body[obKey])}
        })
    )
    Item.findOneAndUpdate({_id: itemId}, escpQuery, {new: true})
        .then(updatedItem =>{
            res.status(200).json(updatedItem)
        })
        .catch(err => {
            console.log('erro updateing Item:', err)
            return res.status(500).json({msg: "Failed to update"})
        })
})

module.exports = router
