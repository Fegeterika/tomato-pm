/**
 * taskModel.js
 *
 * Logics for task-related processes
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
var mysql = require('mysql'),
    bcrypt = require('bcrypt-nodejs');

var config = require('../config/database.js');
var connectDB = mysql.createConnection(config);

// Define model ================================================================
exports.listTasksForProject = (projectid, callback) => {
  var checkQuery = "SELECT * FROM tasks WHERE projectid = ?";
  var queryInsert = [projectid];
  checkQuery = mysql.format(checkQuery, queryInsert);

  connectDB.query(checkQuery, (err, rows) => {
    console.log("Getting the list of tasks for " + projectid);
    if (err) {
      callback(false);
    } else if (rows.length) {
      console.log("done");
      callback(rows);
    } else {
      callback([]);
    }
  });
}
