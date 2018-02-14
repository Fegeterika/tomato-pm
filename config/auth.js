/**
 * auth.js
 *
 * Defines authentication/authorization middlewares
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================

// Configure authentication ====================================================
exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'You need to be logged in to access this page. Please Log in or Sign up');
    res.redirect('/login');
  }
}
