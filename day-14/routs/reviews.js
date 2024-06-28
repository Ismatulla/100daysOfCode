const express = require('express')
const router = express.Router({mergeParams:true})
const Campground = require('../models/campground')
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync')
const { reviewSchema } = require('../schemas');

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body)
  if (error) {
    const message = error.details.map(error => error.message).join(',')
    throw new ExpressError(message, 404)
  } else {
    next()
  }
}
router.post('/:id/reviews', validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  const review = await Review(req.body.review)
  campground.reviews.push(review)
  await review.save()
  await campground.save()
  res.redirect(`/campgrounds/${campground._id}`)
}))
router.delete('/:id/reviews/:reviewId', catchAsync(async (req, res) => {
  const { id, reviewId } = req.params
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/campgrounds/${id}`)
}))

module.exports = router