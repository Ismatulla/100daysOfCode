const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('welcome to shelter😀')
})
app.get('/cats', (req, res) => {
  res.send('meow 🙀')
})
app.get('/dogs', (req, res) => {
  res.send('woof🐶')
})
app.listen('8080', () => console.log('server running on port 8080'))