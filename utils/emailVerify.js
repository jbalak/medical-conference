const User = require('../models/user')
let userVerified
module.exports = async (email) => {
    await User.findOneAndUpdate({ email }, { $set: { isVerified: true } }, { new: true })
        .then(res => {
            userVerified = res.isVerified
        })
    return userVerified



}