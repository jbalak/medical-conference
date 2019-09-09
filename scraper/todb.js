require('../config/db')()
const Organization = require('../models/organisation')
const Conference = require('../models/conference')
const conf = require('./confAlert/json/confAlert2.json')
let i = 0
conf.map((c) => {
	// console.log(c.desc.startingDate)
	if (c.desc.organizedBy != undefined) {
		Organization.findOneAndUpdate(
			{
				organizationName: c.desc.organizedBy
			},
			{
				userType: 'organization',
				organizationName: c.desc.organizedBy
			},
			{ upsert: true, new: true }
		).then((res) => {
			// console.lo

			Conference.findOneAndUpdate(
				{
					title: c.title,
					'location.addressString': c.venue,
					apply_link: c.apply_link,
					// 'date.start': new Date(c.desc.startingDate),
					// 'data.end': new Date(c.desc.endDate),
					website: c.desc.website,
					organizedBy: res._id,
					enquiryEmail: c.desc.enquiryEmail,
					description: c.desc.desc
				},
				{
					title: c.title,
					'location.addressString': c.venue,
					apply_link: c.apply_link,
					// 'date.start': new Date(c.desc.startingDate),
					// 'data.end': new Date(c.desc.endDate),
					website: c.desc.website,
					organizedBy: res._id,
					enquiryEmail: c.desc.enquiryEmail,
					description: c.desc.desc
				},
				{ upsert: true, new: true }
			)
				// .save()
				.then((res) => {
					console.log(res._id)
				})
				.catch((e) => console.log(e.message))
		})
	}
})
