const express = require('express')
const router = express.Router()
const Conference = require('../models/conference')

router.get('/search/:keyword/:location', async (req, res) => {
  let { location, keyword } = req.params

  let conferences = await Conference.find({
    $or: [
      //   { location: 'mum' },
      {
        $text: {
          $search: keyword,
          $caseSensitive: false
        }
      }
    ]
  }).collation({ locale: 'en', strength: 2 })
  if (conferences) {
    return res.send({ conferences })
  }
  res.status(400).send('NO CONFERENCE FOUND')
})

module.exports = router
