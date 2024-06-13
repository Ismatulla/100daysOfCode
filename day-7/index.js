//  working with restful api and creating simple server that handles get request
const express = require('express');
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const comments = [
  { id: 1, username: "Brad", text: "lol thats funny" },
  { id: 2, username: 'Tereza', text: "yeah that is right" },
  { id: 3, username: "Bob", text: "no it is original product " },
]


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
  res.render('comments/new')
})

app.post('/comments', (req, res) => {
  const { username, text } = req.body
  comments.push({ id: uuidv4(), username: username, text: text })
  res.redirect('comments',)
  // res.send('worked !')
})

app.get('/comments/:id', (req, res) => {
  const { id } = req.params
  const comment = comments.find((cmt) => cmt.id == id)
  res.render('comments/singleComment', { comment })
})

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params
  const newCommentText = req.body.text
  const foundComment = comments.find((cmt) => cmt.id == id)
  foundComment.text = newCommentText
  console.log(id)
  res.redirect('/comments')
})
app.listen('8081', () => console.log('running on port 8081'))  