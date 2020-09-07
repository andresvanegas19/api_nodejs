const router = require('express').Router()
const Item = require('../../models/Item')

router.delete('/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params.id)
        .then(result=>{
            console.log('delete result:', result)
            return res.status(204).json()
        })
        .catch(err=>{
            console.log('error deleting item', err)
            return res.status(500).json({msg: "error deletign"})
        })
})


module.exports = router
