const router = require('express').Router()
const Item = require('../../models/Item')

router.get('/', (req, res, next) => {
    const pageSize = 20
    const currentPage = req.query.page > 0 ? req.query.page - 1 : 0
    const sortBy = req.query.sortBy || 'createdAt'
    const orderBy = req.query.orderBy || 'asc'
    const sortQuery = {
        [sortBy]: orderBy
    }

    Item.count()
        .then(itemCount => {
            if (currentPage * pageSize > itemCount)
            {
                return res.status(400).json([])
            }
            Item.find()
                .limit(pageSize)
                .skip(currentPage * pageSize)
                .sort(sortQuery)
                .then(item => {
                    return res.status(200).json({
                        items,
                        page: req.query.page || 1,
                        total: itemCount,
                        pageSize: pageSize
                    })
                })
        })
})


router.get('/:id', (req, res, next) => {
    Item.findOne({_id: req.params.id})
        .then(item =>{
            return res.status(200).json(item)
        })
        .catch(err => {
            console.log('error finding item:', err)
            return res.status(500).json({ msg: "no user found"})
        })
})

module.exports = router
