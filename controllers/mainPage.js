/**
 * userfrontCtr.js
 *
 * contains all controllers for outward pages (public facing)
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var passport = require('passport');


// Define Controllers ==========================================================
exports.showLanding = (req, res) => {
  res.render('landing');
}

exports.showDashboard = (req, res) => {
  var date = new Date();
	res.render('main', {time: date.getHours() + " : " + date.getMinutes(),
                      currTab: 'Home'});
};

exports.showLogin = (req, res) => {
  res.render('login', {currTab: 'Home',
                       message: req.flash('loginMessage')});
};

exports.showSignUp = (req, res) => {
  res.render('signup', {currTab: 'Home',
                        message: req.flash('signupMessage')});
};

exports.attemptLogin = (req, res) => {
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
}

exports.signUpUser = (req, res) => {
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}
