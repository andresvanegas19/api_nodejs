const router = require('express').Router()
const Item = require('../../models/Item')
const { uuid } = require('uuidv4')
const { default: validator } = require('validator')


router.post('/', (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({msg: 'Missing required fields'})
  }
  // mantain the response security
  const scapeItem = Object.assign({},
    ...Object.keys(req.body).map(obKey => {
        if (obKey === 'creator' && !validator.isUUID(req.body[obKey]))
        {
          return res.status(400).json({msg: 'Invalid data'})
        }
        return {[obKey]: validator.escape(req.body[obKey])}
    })
  )
  const item = new Item({...scapeItem, _id: uuid()})
  item.save()
  .then(savedItem => {
    return res.status(201).json(savedItem)
  })
  .catch(err => {
    console.log('error saving item:', err)
    return res.status(500).json({msg: 'Error saving item'})
  })

})

module.exports = router
