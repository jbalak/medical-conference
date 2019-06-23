const mongoose = require('mongoose')

const { Schema } = mongoose

const ConferenceSchema = new Schema({
  title: String,
  description: String,
  location: String,
  date: { type: String, default: Date.now() },
  apply_link: String
})
ConferenceSchema.index(
  { title: 'text', description: 'text' },
  { collation: { locale: 'en', strength: 2 } }
)
const Conference = mongoose.model('Conference', ConferenceSchema, 'Conference')

module.exports = Conference
