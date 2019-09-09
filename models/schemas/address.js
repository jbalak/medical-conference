const mongoose = require('mongoose')
const { Schema } = mongoose

const AddressSchema = new Schema({
	addressString: { type: String, text: true },
	city: {
		type: String
	},
	country: {
		type: String
	},
	state: {
		type: String
	},
	streetAddress: {
		type: String
	},
	locality: {
		type: String
	},
	postalCode: {
		type: String
	}
})

module.exports = AddressSchema
