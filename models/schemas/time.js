const mongoose = require('mongoose')
const { Schema } = mongoose

const TimeSchema = new Schema({
	start: {
		type: Date,
		default: new Date()
	},
	end: {
		type: Date,
		default: new Date()
	}
})

module.exports = TimeSchema
