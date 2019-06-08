const express = require('express')
const router = express.Router()
const Conference = require('../models/conference')


router.post('/search', async (req, res) => {
    let location = req.body.location
    if (!location) {
        return res.status(400).send('Location is not set')
    }
    let conferences = await Conference.find({ location })
    if (conferences) {
        return res.send({ conferences })
    }
    res.status(400).send('No conference available at provided location')
})

module.exports = router