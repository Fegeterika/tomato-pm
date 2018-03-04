/**
 * taskAPI.js
 *
 * contains all controllers for API endpoints related to tasks
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var passport = require('passport');

var taskModel = require('../../models/taskModel');

// Define Controllers ==========================================================


exports.listTasksForProject = (req, res) => {
    var result = taskModel.listTasksForProject(req.params.projectid, (rows) => {
    console.log(rows);
    res.json(rows);
  });
};
