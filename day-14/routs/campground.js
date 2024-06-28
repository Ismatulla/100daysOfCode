const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const { campgroundSchema } = require('../schemas');

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body)
  if (error) {
    const message = error.details.map(error => error.message).join(',')
    throw new ExpressError(message, 404)
  } else {
    next()
  }
}

router.get('/', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds })
}))
// create campground 
router.get('/new', catchAsync((req, res) => {
  res.render('campgrounds/new')
}))
router.post('/', validateCampground, catchAsync(async (req, res,) => {
  const campground = new Campground(req.body.campground)
  await campground.save()
  res.redirect(`/campgrounds/${campground._id}`)


}))

router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findById(id).populate('reviews')
  console.log(campDetail)
  res.render('campgrounds/show', { campDetail })
}))
router.get('/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params
  console.log(id)
  const campDetail = await Campground.findById(id)
  res.render('campgrounds/edit', { campDetail })
}))
router.put('/:id', validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  await campDetail.save()
  res.redirect(`/campgrounds/${campDetail._id}`)

}))
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')

}))
module.exports = router