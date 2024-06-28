// project is in separate folder since it requires a lot of dependencies to install
const session = require('express-session')
const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')


const campgrounds = require('./routs/campground')
const reviews = require('./routs/reviews')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('connected')

  })
  .catch((err) => console.log(err));

const sessionConfig = {
  secret: "thisshouldberealsecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, 
    secure: false, 
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), 
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "lax", // Lax or Strict for local development
    path: "/",
  }
};
app.use(session(sessionConfig))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))



// routing 
app.use('/campgrounds', campgrounds)
app.use('/campgrounds', reviews)

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!', 404))
})

app.use((err, req, res, next) => {
  const { message = "Something went wrong!", statusCode = 500 } = err
  res.status(statusCode)
  res.render('error', { err })
})
app.listen('8080', () => {
  console.log('running on port 8080 🙄')
})