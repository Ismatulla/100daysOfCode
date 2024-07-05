const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleWare')

// img upload middleware
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.get('/', catchAsync(campgrounds.index))

router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm))

router.post('/', isLoggedIn, upload.single('image'), validateCampground, catchAsync(campgrounds.createNewCampground))

router.get('/:id', catchAsync(campgrounds.viewSingleCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.showSingleCampground))

router.put('/:id', isLoggedIn, isAuthor, upload.single('image'), validateCampground, catchAsync(campgrounds.editSingleCampground))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteSingleCampground))
module.exports = router