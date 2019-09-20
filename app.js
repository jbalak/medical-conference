require('dotenv').config()
const conn = require('./config/db')
conn()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const passport = require('passport')

//passport middleware
app.use(passport.initialize())

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
const verify = require('./routes/verify')
const display = require('./routes/view')
const search = require('./routes/conf/search')
const filter = require('./routes/conf/filter')
const signup = require('./routes/authenticate/signup')
const login = require('./routes/authenticate/login')
const register = require('./routes/register')
const organization = require('./routes/organization/organizations')
app.use('/api/conference', display)
app.use('/api/conference', search)
app.use('/api/conference', filter)
app.use('/api/conference', signup)
app.use('/api/conference', login)
app.use('/api/conference', register)
app.use('/api/conference', verify)
app.use('/api/conference/organization', organization)

app.listen(9000, console.log('listening at 9000'))
