const router = require('express').Router()
const { uuid } = require('uuidv4')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const coockie = require('cookie')
const tokenSecret = process.env.tokenSecret || "Set a key in productionk"
const validator = require('validator')

const User = require('../../../models/User')
const Authenticate = User.authenticate()

// api/auth/local/signup
router.post('/', (req, res, next) => {
  const username = validator.escape(req.body.username)
  const password = validator.escape(req.body.password)

  User.register(new User({
    _id: uuid(),
    username,

  }), password)
    .then(user => {
      return Authenticate(username, password)
    })
    .then(authUser => {
      if (!authUser.user) {
        return res.status(403).json({ msg: "Invalid usernae or password" })
      }

      return signedJwt = new Promise((resolve, reject) => {
        jwt.sign({
          id: authUser.user._id,
          username: authUser.user.username
        }, tokenSecret, {
          expiresIn: '48h'
        }, (err, result) => {
          if (err) {
            return reject(err)
          }
          else {
            return resolve(result)
          }
        })
      })
        .then(userJwt => {
          let expiresDate = new Date()
          const coockieOptions = {
            httpOnly: true,
            // This is for allow to https request in secure mode
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: new Date(expiresDate.setHours(expiresDate.getHours() + 48))
          }
          res.cookie('Authorization', userJwt, coockieOptions)
          return authUser.user.save()
        })
        .catch(err => {
          throw new Error(err)
        })
        .then(savedUser => {
          return res.status(201).json({
            user: {
              id: savedUser._id,
              username: savedUser.username
            },
            isAuthenticated: true
          })
        })
    })
    .catch(err => {
      console.log('errror saving user:', err)
      return res.status(500).json({ msg: 'error creating user' })
    })
})


module.exports = router
