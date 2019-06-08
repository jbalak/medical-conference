require('dotenv').config()
const conn = require('./config/db')
conn()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
const display = require('./routes/view')
const search = require('./routes/search')
const signup = require('./routes/signup')
const login = require('./routes/login')

app.use('/api/conference', display)
app.use('/api/conference', search)
app.use('/api/conference', signup)
app.use('/api/conference', login)


app.listen(9000, console.log('listening at 9000'))