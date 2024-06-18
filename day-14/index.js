// project is in separate folder since it requires a lot of dependencies to install
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const Campground = require('./models/campground')
const methodOverride = require('method-override')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('connected')

  })
  .catch((err) => console.log(err));

const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// routing 
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds })
})

// create campground 
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})
app.post('/campgrounds', async (req, res) => {
  console.log(req.body)
  const campground = new Campground(req.body.campground)
  await campground.save()
  res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findById(id)
  res.render('campgrounds/show', { campDetail })
})
app.get('/campgrounds/:id/edit', async (req, res) => {
  const { id } = req.params
  console.log(id)
  const campDetail = await Campground.findById(id)
  res.render('campgrounds/edit', { campDetail })
})
app.put('/campgrounds/:id', async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  await campDetail.save()
  res.redirect(`/campgrounds/${campDetail._id}`)

})
app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')

})
app.listen('8080', () => {
  console.log('running on port 8080 🙄')
})