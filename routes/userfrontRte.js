/**
 * userfrontRte.js
 *
 * contains all routes for outward pages (public facing)
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var express         = require('express'),
    router          = express.Router();

var passport = require('passport');

// Require controller modules
var mainPageCtr = require('../controllers/mainPage');

// Define router ===============================================================

// Landing page
router.route('/').get(mainPageCtr.showLanding);

router.route('/home').get(mainPageCtr.showDashboard);

router.route('/login').get(mainPageCtr.showLogin);

router.route('/login').post(passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
  }));
router.route('/signup').get(mainPageCtr.showSignUp);

router.route('/signup').post(passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
  }));
//router.route('/signup').post(mainPageCtr.signUpUser);

router.route('/logout').get(mainPageCtr.logout);

module.exports = router;
