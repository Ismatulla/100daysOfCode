const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')

const Campground = require('../models/campground')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleWare')



router.get('/', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds })
}))
// create campground 
router.get('/new', isLoggedIn, catchAsync((req, res) => {
  res.render('campgrounds/new')
}))
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res,) => {
  const campground = new Campground(req.body.campground)
  campground.author = req.user._id
  await campground.save()
  req.flash('success', 'new camp created successfully')
  res.redirect(`/campgrounds/${campground._id}`)


}))

router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findById(id).populate({
    path: 'reviews',
    populate: { path: 'author' }
  }).populate('author')
console.log(campDetail)
  if (!campDetail) {
    req.flash('error', 'Something went wrong')
    return res.redirect('/campgrounds')
  }
  res.render('campgrounds/show', { campDetail })
}))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
  const campDetail = await Campground.findById(req.params.id)

  if (!campDetail.author.equals(req.user._id)) {
    req.flash('error', 'You dont have permission to do edit!')
    return res.redirect(`/campgrounds/${req.params.id}`)
  }

  res.render('campgrounds/edit', { campDetail })
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  req.flash('Success', 'Successfully update!')
  await campDetail.save()
  res.redirect(`/campgrounds/${campDetail._id}`)

}))
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
  const { id } = req.params
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')

}))
module.exports = router