const conn = require('./config/db')
conn()

const express = require('express')
const app = express()


app.listen(9000, console.log('listening at 9000'))