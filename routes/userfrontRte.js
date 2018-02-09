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

var mysql = require('mysql');
var config = require('../config/database.js');

var connectDB = mysql.createConnection(config);
// Require controller modules
var mainPageCtr = require('../controllers/mainPage');

router.route('/').get(mainPageCtr.showLanding);

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
