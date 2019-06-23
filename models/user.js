const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  userType: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: String,
  isVerified: { type: Boolean, default: false }
})

module.exports = mongoose.model('user', UserSchema, 'user')
