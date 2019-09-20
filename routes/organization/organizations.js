const express = require('express')
const router = express.Router()
const validateObjectId = require('../../utils/validateObjectId')
const passwordHash = require('../../utils/bcrypt')
const userVerify = require('../../utils/emailVerify')
const Organization = require('../../models/organization')
const Conference = require('../../models/conference')
const _ = require('lodash')

router.post('/signup', async (req, res) => {
	let { organizationName, email, password, address, phone } = req.body

	if (!organizationName || !email || !password || !address || !phone) {
		return res.status(400).send('Some fields are missing')
	}
	let organization = await Organization.findOne({ email, organizationName })

	if (organization && organization.isVerified) {
		return res.status(400).send('This organization is already registered')
	}

	password = await passwordHash(password)
	await new Organization({
		organizationName,
		email,
		password,
		address,
		phone,
		userType: 'organization'
	})
		.save()
		.then(async (org) => {
			if (!org.isVerified) {
				isVerified = await userVerify(org.email)
			}

			return res.send(`${org.organizationName} have been successfully regitered. Please verify your email`)
		})
})

router.put('/update/:id', async (req, res) => {
	if (!validateObjectId(req.params.id)) {
		return res.status(400).send('Invalid organization Request')
	}
	let organization = await Organization.findById(req.params.id).lean()
	if (!organization) {
		return res.status(400).send('no organization found for this id')
	}

	let update = req.body
	update = { ...update, ...organization }
	let updated = await Organization.findByIdAndUpdate(req.params.id, update).lean()
	if (updated) {
		return res.send({ updatedOrg: updated })
	}
	res.send('nothing updated')
})

router.get('/profile/:id', async (req, res) => {
	if (!validateObjectId(req.params.id)) {
		return res.status(400).send('Invalid organization Request')
	}

	let organization = await Organization.findById(req.params.id)
	let newOrg = _.pick(organization, [ 'organizationName', 'email', 'address', 'phone' ])

	if (!newOrg) {
		return res.status(400).send('no organization found')
	}
	res.send(newOrg)
})

router.post('/upload', async (req, res) => {
	let email = 'hdtv7180@gmail.com'
	let organization = Organization.findOne({ email: email }).lean()

	if (!organization) {
		return res.send('no user found for this email')
	}

	if (organization && organization.userType != 'organization') {
		return res.send('you are not allowed to use this route')
	}

	let { title, location, date, website, description } = req.body
	if (!title || !location || !date || !website || !description) {
		return res.send('all fields are required')
	}
	let conference = await new Conference({
		title,
		location,
		date: new Date(date),
		website
	}).save()
	res.send({ savedConf: conference })
})

module.exports = router
