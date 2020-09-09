const router = require('express').Router()
const User = require('../../models/User')
const validator = require('validator')

router.delete('/:id', (req, res, next) => {
    const userId = validator.escape(req.params.id)
    if (!validator.isUUID(userId))
    {
        return res.status(400).json({msg: "Invalid Id"})
    }
    User.findByIdAndDelete(userId)
        .then(result => {
            console.log('delete result:', result)
            return res.status(204).json()
        })
        .catch(err => {
            console.log('error deleting user', err)
            return res.status(500).json({msg: "error deletign"})
        })
})

module.exports = router
