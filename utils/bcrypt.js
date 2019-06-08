const bcrypt = require('bcryptjs')

module.exports = async (passward) => {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(passward, salt)
    return hash

}