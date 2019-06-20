const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
let verified
router.get('/verify/:token', async (req, res) => {

    let email = jwt.verify(req.params.token, process.env.JWT_SECRET)
    let user = await User.find({ email })

    if (user[0].isVerified) {
        return res.send('Invalid request')
    }
    if (email) {
        verified = await User.findOneAndUpdate({ email }, { $set: { isVerified: true } })
    }
    if (verified) { return res.send({ email, token: req.params.token }) }

    res.send('email verification failed please verify again')

})

module.exports = router