const mongoose = require('mongoose')
const { Schema } = mongoose

const AddressSchema = new Schema({
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
