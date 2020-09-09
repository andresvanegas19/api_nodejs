const router = require('express').Router()
const Item = require('../../models/Item')
const validator = require('validator')

router.delete('/:id', (req, res, next) => {
    const userId = validator.escape(req.params.id)
    if (!validator.isUUID(userId))
    {
        return res.status(400).json({msg: "Invalid Id"})
    }
    Item.findByIdAndDelete(userId)
        .then(result=>{
            return res.status(204).json()
        })
        .catch(err=>{
            console.log('error deleting item', err)
            return res.status(500).json({msg: "error deletign"})
        })
})


module.exports = router
