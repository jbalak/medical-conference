const express = require('express')
const router = express.Router()
const Conference = require('../../models/conference')
const JsonStreamStringify = require('json-stream-stringify');
let conference
router.get('/filter', async (req, res) => {

    let { year, month, country, city, page } = req.query
    let conferenceByCity, conferenceByCountry, conferenceByMonth, conferenceByYear
    if (!year) {
        year = null
    }
    if (!month) {
        month = null
    }
    if (!country) {
        country = null
    }
    if (!city) {
        city = null
    }
    if (!page) {
        page = 1
    }

    //stream res to client pipe
    // let stream = Conference.find().stream()
    // new JsonStreamStringify(stream).pipe(res)


    let conferences = await Conference.find()
        .limit(1)
        .skip(1 * page)
        .sort({
            name: 'asc'
        })

    if (year) {
        conferenceByYear = conferences.filter(conf => conf.date.year == year)
    } else {
        conferenceByYear = conferences
    }

    if (month) {
        conferenceByMonth = conferenceByYear.filter(conf => conf.date.month == month)
    }
    else {
        conferenceByMonth = conferenceByYear
    }

    if (country) {
        conferenceByCountry = conferenceByMonth.filter(conf => conf.location.country == country)
    }
    else {
        conferenceByCountry = conferenceByMonth
    }

    if (city) {
        conferenceByCity = conferenceByCountry.filter(conf => conf.location.city == city)
    } else {

        conferenceByCity = conferenceByCountry
    }

    res.send({ conferenceByCity })






})

module.exports = router 