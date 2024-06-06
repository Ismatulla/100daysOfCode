// creating simple server ,working with expressjs
const express = require('express')
const app = express()
const { readFile } = require('fs')
app.get('/', (req, res) => {
  readFile('./index.html', 'utf-8', (err, html) => {
    if (err) {
      res.status(500).send('sorry out of order')
    }
    res.send(html)
  })
})
app.listen(process.env.PORT || 3000, () => console.log('running on port 3000'))