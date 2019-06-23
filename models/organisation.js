const mongoose = require('mongoose')
const { Schema } = mongoose
const AddressSchema = require('./schemas/address')
const OrganisationSchema = new Schema({
  userType: { type: String, required: true },
  email: { type: String, unique: true },
  password: String,
  address: String,
  organizationName: { type: String, unique: true },
  address: AddressSchema,

  companyDescription: {
    type: String
  },
  phone: { type: Number, unique: true },
  website: { type: String, unique: true },
  isVerified: { type: Boolean, default: false }
})

module.exports = mongoose.model(
  'organisation',
  OrganisationSchema,
  'organisation'
)
