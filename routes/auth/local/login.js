const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const tokenSecret = process.env.tokenSecret || 'please set a real secret in proudction'

const User = require('../../../models/User')
const Authenticate = User.authenticate()

// api/auth/local/signup
router.post('/', (req, res, next) => {
    const username = validator.escape(req.body.username)
    const password = validator.escape(req.body.password)
    Authenticate(username, password)
    .then(authUser => {
        if (!authUser.user) {
            throw new Error('Invalid username or password')
        }
        return signedJwt = new Promise((resolve, reject) => {
            jwt.sign({
                id: authUser.user._id,
                username: authUser.user.username
                }, tokenSecret, {
                    expiresIn: '48h'
                }, (err, result) => {
                    if (err)
                    {
                        return reject(err)
                    }
                    else
                    {
                        return resolve(result)
                    }
                }
            )
        })
        .then(userJwt => {
            let expiresDate = new Date()
            expiresDate = new Date(expiresDate.setHours(expiresDate.getHours() + 48))
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                expires: expiresDate
            }
            res.cookie('Authorization', userJwt, cookieOptions)
            return authUser.user.save()
        })
        .catch( err => {
            throw new Error(err)
        })
    })
    .then(savedUser => {
    // console.log('cookie:', res.cookie)
        return res.status(201).json({
            user: {
            id: savedUser._id,
            username: savedUser.username
            },
            isAuthenticated: true
        })
    })
    .catch(err => {
        console.log('err saving user:', err)
        return res.status(500).json({msg: 'Invalid username or password'})
    })
})

module.exports = router