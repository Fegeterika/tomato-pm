/**
 * projectAPIRte.js
 *
 * contains all routes serving as API endpoint related to projects
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var express = require('express'),
    router = express.Router();

// Require auth middleware
var auth = require('../../config/auth');

// Require controller modules
var projectAPI = require('../../controllers/api/projectAPI');

// Define router ===============================================================

// Landing page
router.route('/projects').get(auth.isAuthenticated, projectAPI.readAllProjectsForCurrentUser);

// param api for testing
router.route('/projects/:cid/:uid').get(projectAPI.readAllProjectsForUser);

module.exports = router;
