const mongoose = require('mongoose')
const { Schema } = mongoose
const CoordinatesSchema = new Schema({
	location: {
		type: {
			type: String,
			enum: [ 'Point' ]
		},
		coordinates: {
			type: [ Number ]
		}
	}
})

CoordinatesSchema.index({ location: '2dsphere' })

module.exports - CoordinatesSchema
