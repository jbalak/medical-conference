const passport = require('../auth/passport')
const express = require('express')

const router = express.Router()


router.post('/register',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        res.send(req.user)
    })


module.exports = router