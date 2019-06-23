const express = require('express')
const router = express.Router()
const passwordHash = require('../../utils/bcrypt')
const userVerify = require('../../utils/emailVerify')
const Organization = require('../../models/organisation')
const Conference = require('../../models/conference')

router.post('/signup', async (req, res) => {
  let { organizationName, email, password, address, phone } = req.body

  if (!organizationName || !email || !password || !address || !phone) {
    return res.status(400).send('Some fields are missing')
  }
  let organization = await Organization.findOne({ email, organizationName })

  if (organization && organization.isVerified) {
    return res.status(400).send('This organization is already registered')
  }

  console.log(">>>>>>>", organization)
  password = await passwordHash(password)
  await new Organization({
    organizationName, email, password, address, phone, userType: 'organization'
  })
    .save().then(async org => {
      if (!org.isVerified) {
        isVerified = await userVerify(org.email)
      }

      return res.send(`${org.organizationName} have been successfully regitered. Please verify your email`)

    })
})

router.get('/profile/:id', async (req, res) => {
  let organisation = await Organization.findById(req.params.id)
  res.send(organisation)
})


router.post('/upload', async (req, res) => {


  //verify that this route only called by  verified org get token
  //and verify


  let { title, description, location, date } = req.body

  if (!title || !description || !location) {
    return res.status(400).send('some fields are missing')
  }

  let userType = 'organization'
  let email = "dailydoc@gmail.com"
  let organization = await Organization.findOne({ email })

  if (organization.userType != userType) {
    return res.status(401).send('You are not allowed to this route')
  }

  await Conference.findOneAndUpdate({
    title, location
  }, {
      title, description, location, userType
    }, { upsert: true }).then(resp => {
      if (resp) {
        return res.status(400).send('This conference is already added')
      }

      return res.send('Conference added successfully')
    })

})





module.exports = router
