const express = require('express');
const app = express();
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash')
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
  .then(() => {
    console.log('connected');
  })
  .catch((err) => console.log(err));


app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: "secretprivaterroute" }))

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login')
  }
  next()
}

app.get('/', (req, res) => {
  res.send("home page")
})
app.get('/register', (req, res) => {
  res.render("register")
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  const hash = await bcrypt.hash(password, 12)
  const user = new User({
    username,
    password: hash
  })
  await user.save()
  req.session.user_id = user._id;
  res.redirect('/secret')

})
app.get('/login', (req, res) => {
  res.render("login")
})
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const foundUser = await User.findAndValidate(username, password)
  if (foundUser) {
    req.session.user_id = foundUser._id;
    res.redirect('/secret')
  } else {
    res.redirect('login')
  }


})
app.post('/logout', (req, res) => {
  req.session.user_id = null
  res.redirect('/login')
})

app.get('/secret', requireLogin, (req, res) => {

  res.render("secret")
})
app.listen('8080', () => console.log('running on port 8080 🤠'))

