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
  	expSession = require('express-session'),
    RedisStore = require('connect-redis')(expSession),
  	flash = require('connect-flash');

// Load configuration
var config = require('./config')();
var redisConf = require('./config/redis');

// Load routes
var publicRte = require('./routes/publicRte');
var projectAPIRte = require('./routes/api/projectAPIRte');
var taskAPIRte = require('./routes/api/taskAPIRte');

// Configuration ===============================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Add parsers
app.use(cookieParser());
app.use(bodyParser());

// Session & passport Configuration
// Using RedisStore
app.use(expSession({store: new RedisStore(redisConf),
                 secret: 'tomatopm1089',
                 resave: false,
                 saveUninitialized: false}));

// Using local memstore
// app.use(session({secret: 'tomatopm1089',
//                 resave: false,
//                 saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(flash());

// Expose req.user to all pages
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  return next();
})

// routes
app.use('/', publicRte);
app.use('/api', projectAPIRte);
app.use('/api', taskAPIRte);

// Launch a web server =========================================================
http.listen(config.port, () => {
	console.log("Server opened at port: " + config.port);
})
