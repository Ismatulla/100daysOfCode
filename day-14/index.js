const session = require('express-session');
const express = require('express');
const flash = require('connect-flash')
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');

const userRoutes = require('./routs/users')
const campgroundRoutes = require('./routs/campground');
const reviewsRoutes = require('./routs/reviews');

const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('connected');
  })
  .catch((err) => console.log(err));

const sessionConfig = {
  secret: "thisshouldberealsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
};


app.use(session(sessionConfig));
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/fakeUser', async (req, res) => {
  const user = new User({ email: "test@gmail.com", username: 'test' })
  const newUser = await User.register(user, 'Sherali Navoiy')
  res.send(newUser)
})
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds', reviewsRoutes);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!', 404));
});

app.use((err, req, res, next) => {
  const { message = "Something went wrong!", statusCode = 500 } = err;
  res.status(statusCode);
  res.render('error', { err });
});

app.listen('8080', () => {
  console.log('running on port 8080 🙄');
});
