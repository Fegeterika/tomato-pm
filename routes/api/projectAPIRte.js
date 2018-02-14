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

var passport = require('passport');

// Require controller modules
var projectAPI = require('../../controllers/api/projectAPI');

// Define router ===============================================================

// Landing page
router.route('/projects').get(projectAPI.readAllProjectsForUser);

module.exports = router;
