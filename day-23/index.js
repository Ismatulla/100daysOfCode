const express = require('express')
const app = express()
const router = require('./routes/shelters')
const session = require('express-session')

app.use(session({ secret: "fakesecretishere" }))
app.use('/', router)

app.listen('4567', () => console.log('server runiing 4567'))

