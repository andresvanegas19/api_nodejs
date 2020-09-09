const router = require('express').Router()
const User = require('../../models/User')
const validator = require('validator')


router.get('/', (req, res, next) => {
    const pageSize = 20
    // avoid to malisios query into the api
    const escpQuery = Object.assign({},
        // copies all enumerable own properties from one or more
        // source objects to a target object. It returns the target object.
        ...Object.keys(req.query).map(obKey => {
            return {[obKey]: validator.escape(req.query[obKey])}
        })
    )

    // This is for the page start to the 1 not to the 0
    const currentPage = parseInt(escpQuery.page) > 0 ? parseInt(escpQuery.page) - 1 : 0
    const sortBy = escpQuery.sortBy || 'username'
    // order in ascending order the query
    const orderBy = escpQuery.orderBy || 'asc'
    // this is for the order the query
    const sortQuery = {
        [sortBy]: orderBy
    }



    const filter = escpQuery.filter || ''
    const filterQuery = {
        username: new RegExp(filter, 'i')
    }

    User.countDocuments(filterQuery)
        .then(userCount => {
            if (currentPage * pageSize > userCount)
            {
                // this is for return the json with 0 json because the page pass
                // the restriction and the data has the mongoose db
                return res.status(400).json([])
            }
            User.find(filterQuery)
                .limit(pageSize)
                .skip(currentPage * pageSize)
                .sort(sortQuery)
                .then(users => {
                    return res.status(200).json({
                        users,
                        page: escpQuery.page || 1,
                        total: userCount,
                        pageSize: pageSize
                    })
                })
        })
        .catch(err => {
            console.log('error finding user:', err)
            return res.status(500).json({ msg: "no user found"})
        })
})

router.get('/:id', (req, res, next) => {
    const userId = validator.scape(req.params.id)
    if (!validator.isUUID(userId))
    {
        return res.status(400).json({msg: "Invalid Id"})
    }

    User.findOne({_id: userId})
        .then(user =>{
            return res.status(200).json(user)
        })
        .catch(err => {
            console.log('error finding user:', err)
            return res.status(500).json({ msg: "no user found"})
        })
})


module.exports = router
