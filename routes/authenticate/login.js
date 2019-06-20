const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passwordHash = require('../../utils/bcrypt')
const genToken = require('../../utils/genToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let token
router.post('/login', async (req, res) => {
    let { email, password } = req.body
    if (!email && !password) {
        return res.status(400).send('empty email or password')
    }

    let user = await User.findOne({ email })
    if (user) {
        // console.log(user.password, { hash: await passwordHash(password) })
        let validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).send('password not valid')
        }
        if (!user.isVerified) {
            return res.status(400).send('this email is not verified, please verify your email first')
        }
        return res.send({ token: await genToken(email), verify: await jwt.verify(await genToken(email), process.env.JWT_SECRET) })
    }

    return res.status(400).send('No user found')


})
router.post('/logout', (req, res) => {
    res.send('logout')
})
module.exports = router