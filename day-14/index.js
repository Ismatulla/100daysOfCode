// project is in separate folder since it requires a lot of dependencies to install
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const Campground = require('./models/campground')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const catchAsync = require('./utils/catchAsync')
const { campgroundSchema } = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('connected')

  })
  .catch((err) => console.log(err));

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// routing 

app.get('/campgrounds', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds })
}))
const validateCampground = (req, res, next) => {

  const { error } = campgroundSchema.validate(req.body)
  if (error) {
    const message = error.details.map(error => error.message).join(',')
    throw new ExpressError(message, 404)
  } else {
    next()
  }


}
// create campground 
app.get('/campgrounds/new', catchAsync((req, res) => {
  res.render('campgrounds/new')
}))
app.post('/campgrounds', validateCampground, catchAsync(async (req, res,) => {
  const campground = new Campground(req.body.campground)
  await campground.save()
  res.redirect(`/campgrounds/${campground._id}`)


}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findById(id)
  res.render('campgrounds/show', { campDetail })
}))
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params
  console.log(id)
  const campDetail = await Campground.findById(id)
  res.render('campgrounds/edit', { campDetail })
}))
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  await campDetail.save()
  res.redirect(`/campgrounds/${campDetail._id}`)

}))
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')

}))

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