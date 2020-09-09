const router = require('express').Router()
const User = require('../../models/User')
const validator = require('validator')

router.put('/:id', (req, res, next) =>  {
    const userId = validator.escape(req.params.id)
    if (!validator.isUUID(userId))
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
    User.findOneAndUpdate({_id: userId}, escpQuery, {new: true})
        .then(updatedUser =>{
            res.status(200).json(updatedUser)
        })
        .catch(err => {
            console.log('erro updateing user:', err)
            return res.status(500).json({msg: "Failed to update"})
        })
})

module.exports = router
