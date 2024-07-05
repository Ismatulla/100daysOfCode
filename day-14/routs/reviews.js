const express = require('express')
const router = express.Router({ mergeParams: true })
const Campground = require('../models/campground')
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleWare')
const reviews = require('../controllers/reviews')

router.post('/:id/reviews', isLoggedIn, validateReview, catchAsync(reviews.postReviews))

router.delete('/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReviews))

module.exports = router