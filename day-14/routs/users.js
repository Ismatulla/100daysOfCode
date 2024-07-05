const express = require('express');
const router = express.Router()

const catchASync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleWare');
const users = require('../controllers/users')

router.get('/register', users.getRegister)
router.post('/register', catchASync(users.postRegister))
router.get('/login', users.getLogin)
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), users.postLogin)
router.get('/logout', users.logout)
module.exports = router

