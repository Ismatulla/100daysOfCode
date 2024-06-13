const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true })) // to access request.body we need to put this line for forms that sends data from url
app.use(express.json())  // parses json data sent to server 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


const riddle = [
  { id: uuidv4(), username: "Bio", post: "that was an amazing post!", detail: 'li have read fully it is legit thing' },
  { id: uuidv4(), username: "Dustin", post: "what a wodnerful night!", detail: "it was great fight ,hands up to the men of the men\'s well deserved fight of the night" },
  { id: uuidv4(), username: "Tom", post: "not sure if your statement is correct!", detail: "the description you gave is depricited, and you are claiming that it works 100 percent " }]

app.get('/', (req, res) => {
  res.render('index', { riddle })
})

app.get('/singlePost/:id', (req, res) => {
  const { id } = req.params
  const singleData = riddle.find((data) => data.id == id)
  res.render('singlePost', { singleData })
})
app.get('/createForm', (req, res) => {
  res.render('createForm')
})
app.post('/createForm', (req, res) => {
  const { username, post, detail } = req.body
  riddle.push({ id: uuidv4(), username, post, detail })
  res.redirect('/')
})
app.get('/updateForm/:id/edit', (req, res) => {
  const { id } = req.params
  const singleData = riddle.find((data) => data.id == id)
  res.render('updateForm', { singleData })
})

app.patch('/updateForm/:id/edit', (req, res) => {
  const { username, post, detail } = req.body
  const { id } = req.params
  const findSingleData = riddle.find((data) => data.id == id)
  findSingleData.username = username,
    findSingleData.post = post,
    findSingleData.detail = detail
  console.log(req.body)
  res.redirect('/')
})

app.listen('8080', () => console.log('running on port 8080'))