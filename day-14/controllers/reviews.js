const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.postReviews = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  const review = await Review(req.body.review)
  review.author = req.user._id;
  campground.reviews.push(review)
  await review.save()
  await campground.save()
  req.flash('success', 'Created new review')
  res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.deleteReviews = async (req, res) => {
  const { id, reviewId } = req.params
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/campgrounds/${id}`)
}