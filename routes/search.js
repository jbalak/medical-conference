const express = require('express')
const router = express.Router()
const Conference = require('../models/conference')


router.get('/search/:keyword/:location', async (req, res) => {
    let { location, keyword } = req.params

    console.log(location, keyword)
    // if (!location) {
    //     return res.status(400).send('Location is not set')
    // }
    // MyModel.find({ $text: { $search: searchString } })

    let conferences = await Conference.find({
        $text: {
            $search: keyword
        }
    })
    if (conferences) {
        return res.send({ conferences })
    }
    res.status(400).send('NO CONFERENCE FOUND')

})

module.exports = router