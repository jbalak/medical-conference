const express = require('express')
const router = express.Router()
const Conference = require('../../models/conference')

router.get('/search/:keyword/:location', async (req, res) => {
	let { keyword, location } = req.params
	location = location ? location : ''
	console.log({ keyword, location })
	let conferences = await Conference.find({
		$text: {
			$search: keyword,
			$caseSensitive: false
		}
	})
		.collation({ locale: 'en', strength: 2 })
		.limit(20)
	if (conferences) {
		return res.json({ count: conferences.length, conferences })
	}
	res.status(400).send('NO CONFERENCE FOUND')
})

module.exports = router
