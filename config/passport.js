/**
 * passport.js
 *
 * Controls authentication logics
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var LocalStrategy = require('passport-local').Strategy;

var userModel = require('../models/userModel.js');


var mysql = require('mysql');
var config = require('../config/database.js');
var connectDB = mysql.createConnection(config);
// Configure authentication ====================================================
module.exports = (passport) => {

  // Persist login session
  passport.serializeUser( (user, done) => {
    done(null, user.userid);
  });

  passport.deserializeUser( (id, done) => {
    connectDB.query("SELECT * FROM users WHERE userid = " + id, (err, rows) => {
      done(err, rows[0]);
    });
  });

  // Local-Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // pass back request to call back
  }, (req, email, password, done) => {
    var checkQuery = "SELECT * FROM users WHERE email = ?";
    var queryInsert = email.toLowerCase();
    checkQuery = mysql.format(checkQuery, queryInsert);

    connectDB.query(checkQuery, (err, rows) => {
      console.log(rows);
      console.log("above row object");
      if (err) { return done(err) };
      if (rows.length) {
        // User already exists
        return done(null, false, req.flash('signupMessage', "Account with this email already exists"));
      } else {
        // User does not exist. Sign up user
        var newUser = new Object();
        newUser.email = email.toLowerCase();
        newUser.password = userModel.generateHash(password);

        var insertQuery = "INSERT INTO users (email, pw) VALUES (?, ?)";
        var valuesInsert = [newUser.email, newUser.password];
        insertQuery = mysql.format(insertQuery, valuesInsert);

        connectDB.query(insertQuery, (err, rows) => {
          newUser.userid = rows.insertId;
          return done(null, newUser);
        });
      }
    });
  })); // Closes passport.use('local-signup')...

  // Local-Login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    var checkQuery = "SELECT * FROM users WHERE email = ?"
    var queryInsert = email.toLowerCase();
    checkQuery = mysql.format(checkQuery, queryInsert);

    connectDB.query(checkQuery, (err, rows) => {
      if (err) { return done(err) };

      // If no user is found
      if (!rows.length) {
        console.log("No account");
        return done(null, false, req.flash('loginMessage', "No Account with this email found"));
      } else {
        // If password is wrong
        if (!userModel.checkPassword(rows[0], password)) {
          console.log("wrong PW");
          return done(null, false, req.flash('loginMessage', "Wrong email or password"));
        }
        return done(null, rows[0]);
      }
    });
  })); // Closes passport.use('Local-Login')...

}
