/**
 * taskAPIRte.js
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
var taskAPI = require('../../controllers/api/taskAPI');

// Define router ===============================================================

// Landing page
router.route('/tasks/:projectid').get(auth.isAuthenticated, taskAPI.listTasksForProject);

module.exports = router;
