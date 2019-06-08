const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    isVerified: { type: Boolean, default: false }
})

module.exports = mongoose.model('user', UserSchema, 'user')