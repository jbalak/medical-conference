const mongoose = require('mongoose')
const { Schema } = mongoose

const TimeSchema = new Schema({
  year: {
    type: Number
  },
  month: {
    type: Number
  }

})

module.exports = TimeSchema
