const mongoose = require('mongoose')
const AddressSchema = require('./schemas/address')
const { Schema } = mongoose
const TimeSchema = require('./schemas/time')
const ConferenceSchema = new Schema({
	title: { type: String, text: true },
	location: AddressSchema,
	date: TimeSchema,
	apply_link: String,
	website: String,
	organizedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'organization'
	},
	enquiryEmail: '',
	description: { type: String, text: true }
})
ConferenceSchema.index(
	{ title: 'text', description: 'text', 'location.addressString': 'text' },
	{ collation: { locale: 'en', strength: 2 } }
)

const Conference = mongoose.model('Conference', ConferenceSchema, 'Conference')

module.exports = Conference
