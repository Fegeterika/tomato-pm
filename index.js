/**
 * index.js
 *
 * used as the entry point for node.js app server
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var express = require('express'),
    app = express(),
 	  http = require('http').Server(app);

var path = require('path'),
  	bodyParser = require('body-parser'),
  	cookieParser = require('cookie-parser'),
  	passport = require('passport'),
  	session = require('express-session'),
  	flash = require('connect-flash');

// Load configuration
var config = require('./config')();

var userfrontRte    = require('./routes/userfrontRte.js');

// Configuration ===============================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(bodyParser());
app.use(flash());

// passport
app.use(session({secret: 'tomatopm1089', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

// Expose req.user to all pages
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  return next();
})

// routes
app.use('/', userfrontRte);

// Launch a web server =========================================================
http.listen(config.port, () => {
	console.log("Server opened at port: " + config.port);
})
