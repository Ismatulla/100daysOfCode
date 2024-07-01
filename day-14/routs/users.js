const express = require('express');
const router = express.Router()
const User = require('../models/user')
const catchASync = require('../utils/catchAsync');
const passport = require('passport');
router.get('/register', (req, res) => {
  res.render('users/register')
})
router.post('/register', catchASync(async (req, res) => {
  try {
    const { username, password, email } = req.body
    const user = new User({ username, email })
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash("success", 'Welcome to Yelp Camp!')
    res.redirect('/campgrounds')
  } catch (error) {
    console.log(error)
    req.flash("error", error.message)
    res.redirect('/register')
  }

}))

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), (req, res) => {

  req.flash('success', 'Welocome back')
  res.redirect('/campgrounds')
})
module.exports = router

// req.logout(function (err) {
//   if (err) {
//       return next(err);
//   }
//   req.flash('success', 'Goodbye!');
//   res.redirect('/campgrounds');
// });