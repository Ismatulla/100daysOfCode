// working with template engines (setting view directory ,view,path ,ejs interpolation ,passing data in ejs
const express = require('express');
const path = require('path')
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
  res.render('home.ejs')
})
app.get('/random', (req, res) => {
  const rand = Math.floor(Math.random() * 10) + 1
  res.render('random', { rand })
})

app.listen('8080', () => console.log('running on port 8080'))