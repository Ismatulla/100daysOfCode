const User = require('../models/user')
module.exports.getRegister = (req, res) => {
  res.render('users/register')
}

module.exports.postRegister = async (req, res, next) => {
  try {
    const { username, password, email } = req.body
    const user = new User({ username, email })
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err)
      req.flash("success", 'Welcome to Yelp Camp!')
      res.redirect('/campgrounds')
    })

  } catch (error) {
    req.flash("error", error.message)
    res.redirect('/register')
  }

}


module.exports.getLogin = (req, res) => {
  res.render('users/login')
}
module.exports.postLogin = (req, res) => {
  req.flash('success', 'Welocome back')
  const redirectUrl = res.locals.returnTo || '/campgrounds'
  res.redirect(redirectUrl)
}
module.exports.logout=(req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
  });
}