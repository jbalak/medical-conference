const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passwordHash = require('../utils/bcrypt')
const bcrypt = require('bcryptjs')
let token = 'token12345'
router.post('/login', async (req, res) => {
    let { email, password } = req.body
    if (!email && !password) {
        return res.status(400).send('Invalid email or password')
    }
    let hashPassword = passwordHash(password)

    let user = await User.findOne({ email, password })
    if (user) {
        let validPassword = await bcrypt.compare(hashPassword, password)
        if (!validPassword) {
            return res.status(400).send('Invalid email or password')
        }
        if (!user.isVerified) {
            return res.status(400).send('this email is not verified, please verify your email first')
        }
        return res.send({ token })
    }

    return res.status(400).send('Invalid email or password')


})

module.exports = router