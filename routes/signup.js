const User = require('../models/user')
const express = require('express')
let userVerify = require('../utils/emailVerify')
const router = express.Router()
const passwordHash = require('../utils/bcrypt')
let isVerified
let newUser
router.post('/signup', async (req, res) => {
    let { firstName, lastName, email, password, address } = req.body
    let user = await User.findOne({ email })
    if (user && user.isVerified) {
        return res.status(400).send('email already used,\n please use another email')
    }
    password = await passwordHash(password)
    console.log({ passwordHash: password })
    newUser = await new User({ firstName, lastName, email, password, address })

        .save()
        .then(async user => {
            if (!user.isVerified) {
                isVerified = await userVerify(user.email)
            }
            console.log({ isVerified })
            if (user && isVerified) {
                return res.send(`${user.firstName} has been successfully regitered`)
            }
            res.status(400).send('email is yet not verified please verify your email')
        })



})

module.exports = router