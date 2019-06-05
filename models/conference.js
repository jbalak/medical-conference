const mongoose = require('mongoose')

const { Schema } = mongoose

const ConferenceSchema = new Schema({
    title: String,
    description: String,
    location: String,
    date: String
    ,
    apply_link: String
})

const Conference = mongoose.model('Conference', ConferenceSchema, 'Conference')

module.exports = Conference