const router = require('express').Router()
const Item = require('../../models/Item')
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

    const currentPage = escpQuery.page > 0 ? escpQuery.page - 1 : 0
    const sortBy = escpQuery.sortBy || 'createdAt'
    const orderBy = escpQuery.orderBy || 'asc'
    const sortQuery = {
        [sortBy]: orderBy
    }

    const filter = escpQuery.filter || ''
    const filterOn = escpQuery.filterOn || ''
    let filterQuery = {}
    if (filter.length > 0)
    {
        const regx = new RegExp(filter, 'i')
        // This is for check if where filter the parameters
        if (filterOn.length > 0)
        {
            filterQuery = {
                [filterOn]: regx
            }
        }
        else
        {
            filterQuery = {
                content: regx
            }
        }
    }

    Item.countDocuments(filterQuery)
        .then(itemCount => {
            if (currentPage * pageSize > itemCount)
            {
                return res.status(400).json([])
            }
            Item.find(filterQuery)
                .limit(pageSize)
                .skip(currentPage * pageSize)
                .sort(sortQuery)
                .then(items => {
                    return res.status(200).json({
                        items,
                        page: escpQuery.page || 1,
                        total: itemCount,
                        pageSize: pageSize
                    })
                })
        })
        .catch(err => {
            console.log('error finding item:', err)
            return res.status(500).json({ msg: "no user found"})
        })
})


router.get('/:id', (req, res, next) => {
    const userId = validator.escape(req.params.id)
    if (!validator.isUUID(userId))
    {
        return res.status(400).json({msg: "Invalid Id"})
    }
    Item.findOne({_id: userId})
        .then(item =>{
            return res.status(200).json(item)
        })
        .catch(err => {
            console.log('error finding item:', err)
            return res.status(500).json({ msg: "no user found"})
        })
})

module.exports = router
