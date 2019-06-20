const User = require('../../models/user')
const express = require('express')
let userVerify = require('../../utils/emailVerify')
const router = express.Router()
const passwordHash = require('../../utils/bcrypt')
let isVerified
let newUser
router.post('/signup', async (req, res) => {
    let { firstName, lastName, email, password, address } = req.body
    if (!firstName) {
        return res.status(400).send('first name is missing')
    }
    if (!lastName) {
        return res.status(400).send('lastname is missing')
    }

    if (!email) {
        return res.status(400).send('email is missing')
    }

    if (!password) {
        return res.status(400).send('password is missing')
    }
    if (!address) {
        return res.status(400).send('address is missing')
    }

    let user = await User.findOne({ email })
    if (user && user.isVerified) {
        return res.status(400).send('email already used,\n please use another email')
    }
    if (user && !user.isVerified) {
        isVerified = await userVerify(user.email)
        return res.status(400).send('You have already registered please verify your email first')

    }


    password = await passwordHash(password)
    console.log({ passwordHash: password })
    newUser = await new User({ firstName, lastName, email, password, address })

        .save()
        .then(async user => {
            if (!user.isVerified) {
                isVerified = await userVerify(user.email)
            }

            return res.send(`${user.firstName} you have been successfully regitered. Please verify your email`)

        })
})

module.exports = router