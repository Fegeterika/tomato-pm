/**
 * projectAPI.js
 *
 * contains all controllers for API endpoints related to projects
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var passport = require('passport');

var projectModel = require('../../models/projectModel');

// Define Controllers ==========================================================
exports.readAllProjectsForCurrentUser = (req, res) => {
    var result = projectModel.readListOfProjects(req.user.userid, req.user.cid, (rows) => {
    console.log(rows);
    res.send(rows);
  });
};

exports.readAllProjectsForUser = (req, res) => {
    var result = projectModel.readListOfProjects(req.params.uid, req.params.cid, (rows) => {
    console.log(rows);
    res.send(rows);
  });
};
