const mongoose = require('mongoose')
const AddressSchema = require('./schemas/address')
const { Schema } = mongoose
const TimeSchema = require('./schemas/time')
const ConferenceSchema = new Schema({
  title: String,
  description: String,
  location: AddressSchema,
  date: TimeSchema,
  apply_link: String
})
ConferenceSchema.index(
  { title: 'text', description: 'text', location: 'text' },
  { collation: { locale: 'en', strength: 2 } }
)


const Conference = mongoose.model('Conference', ConferenceSchema, 'Conference')

module.exports = Conference
