const Campground = require("../models/campground")

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new')
}

module.exports.createNewCampground = async (req, res,) => {
  const campground = new Campground(req.body.campground)
  campground.image = { url: req.file.path, filename: req.file.filename }
  campground.author = req.user._id
  await campground.save()
  req.flash('success', 'new camp created successfully')
  res.redirect(`/campgrounds/${campground._id}`)


}

module.exports.viewSingleCampground = async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findById(id).populate({
    path: 'reviews',
    populate: { path: 'author' }
  }).populate('author')
  if (!campDetail) {
    req.flash('error', 'Something went wrong')
    return res.redirect('/campgrounds')
  }
  res.render('campgrounds/show', { campDetail })
}

module.exports.showSingleCampground = async (req, res) => {
  const campDetail = await Campground.findById(req.params.id)

  if (!campDetail.author.equals(req.user._id)) {
    req.flash('error', 'You dont have permission to do edit!')
    return res.redirect(`/campgrounds/${req.params.id}`)
  }

  res.render('campgrounds/edit', { campDetail })
}
module.exports.editSingleCampground = async (req, res) => {
  const { id } = req.params
  const campDetail = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  campDetail.image = { url: req.file.path, filename: req.file.filename }
  await campDetail.save()
  req.flash('Success', 'Successfully update!')
  res.redirect(`/campgrounds/${campDetail._id}`)

}

module.exports.deleteSingleCampground = async (req, res) => {
  const { id } = req.params
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')

}