const jwt = require('jsonwebtoken')
module.exports = async payload => await jwt.sign(payload, process.env.JWT_SECRET)
