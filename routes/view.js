const mongoose = require('mongoose')
const Conference = require('../models/conference')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    let conf = await Conference.find()
    res.send(conf)
})

module.exports = router