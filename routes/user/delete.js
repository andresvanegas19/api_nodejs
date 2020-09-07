const router = require('express').Router()
const User = require('../../models/User')

router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(result=>{
            console.log('delete result:', result)
            return res.status(204).json()
        })
        .catch(err=>{
            console.log('error deleting user', err)
            return res.status(500).json({msg: "error deletign"})
        })
})

module.exports = router
