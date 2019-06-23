const User = require('../models/user')
const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')
let userVerified, token
module.exports = async (email) => {
    console.log({ email })
    token = await jwt.sign(email, process.env.JWT_SECRET)
    console.log(token)

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hdtv7180@gmail.com',
            pass: 'hdtvhdtv7180'
        }
    })

    const mailOpt = {
        from: 'conference@gmail.com',
        to: 'hdtv7180@gmail.com',
        subject: 'Email verification',
        text: `<a href="localhost:3000/api/verify/${token}"> here</a>`

    }

    transporter.sendMail(mailOpt, (err, res) => {
        if (err) {
            console.log(err.message)
        }
        else {
            console.log('Email sent')
        }
    })


}


