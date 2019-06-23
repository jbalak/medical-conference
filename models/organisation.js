const mongoose = require('mongoose')
// let ObjectId = mongoose.Types.ObjectId
const { Schema } = mongoose
const AddressSchema = require('./schemas/address')
const OrganisationSchema = new Schema({
  userType: { type: String, required: true },
  email: { type: String, unique: true },
  password: String,
  address: String,
  organizationName: { type: String, unique: true },
  address: AddressSchema,
  appliedConferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conference' }],
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
