const mongoose = require('mongoose')
require('../config/db')()
const result = require('./result.json')
const Conferences = require('../models/conference')
// Conferences.insertMany(result).then(res => {
//     console.log({ res })
// })
result.map(async res => {
    await Conferences.create({
        title: res.title,
        date: res.date,
        description: res.desc.desc.replace(/\n/g, ' ').replace(/\n/g, ' ').replace(/ /g, ' ')
    }, () => { })
})