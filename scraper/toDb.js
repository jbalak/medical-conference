const mongoose = require('mongoose')
require('../config/db')()
const result = require('../result.json')
const Conferences = require('../models/conference')
result.forEach(element => {
    new Conferences(
        element
    ).save()
});