const uniq = require('../../utils/uniq')
const fs = require('fs')
let jobs = []
const Xray = require('x-ray')
let phantom = require('x-ray-nightmare')
const x = Xray({
	filters: {
		trim: function(value) {
			return typeof value === 'string' ? value.trim() : value
		},
		slice: function(value, start, end) {
			return typeof value === 'string' ? value.slice(start, end) : value
		}
	}
})
// .driver(phantom())
x('https://www.conferencealerts.in/Event-Topic.php?topic=Health%20and%20Medicine', '#home > div > div > div', [
	{
		title: 'div.listing-detal.col-md-7 > a | trim',
		date: 'div.col-md-2.listing-date | trim',
		venue: '.listing-place.col-md-3 | trim',
		apply_link: 'div.listing-detal.col-md-7 > a@href',
		desc: x('div.listing-detal.col-md-7 > a@href', {
			startingDate: '.conf-listing.col-md-9 > div > p:nth-child(6) | trim | slice:15',
			endDate: 'div.conf-listing.col-md-9 > div > p:nth-child(7) | trim | slice:12',
			organizedBy: 'div.conf-listing.col-md-9 > div > p:nth-child(9) | trim | slice: 14',
			enquiryEmail:
				'body > div > div.conf-details > div > div.conf-listing.col-md-9 > div > p:nth-child(12) | trim | slice: 30',
			website:
				'body > div > div.conf-details > div > div.conf-listing.col-md-9 > div > p:nth-child(13) > a | trim',
			desc: '.conf-listing.col-md-9 | trim | slice:12 | trim'
		})
	}
])
	.paginate('#home > div > div > div.pull-right > ul > li:nth-child(8) > a@href')
	.limit(58)
	.write('./json/confAlert2.json')
// .then((res) => {
// 	fs.writeFileSync('./json/confAlert2.json', JSON.stringify(res))
// 	console.log(res.length, uniq(res).length)
// })
