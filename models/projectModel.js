/**
 * projectModel.js
 *
 * Logics for project-related processes
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
exports.readProjectsForUser = (userid, companyid, callback) => {
  var checkQuery = "SELECT projectid, pj.name, pj.description FROM permissions pm INNER JOIN " +
                   "user_perm_assign upa ON pm.permid = upa.permid INNER JOIN " +
                   "projects pj ON pj.permid = pm.permid " +
                   "WHERE pm.cid = ? AND upa.userid = ?";
  var queryInsert = [companyid, userid];
  checkQuery = mysql.format(checkQuery, queryInsert);

  connectDB.query(checkQuery, (err, rows) => {
    console.log("Getting the list of projects for " + userid);
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

exports.readProjectsForUserAndGroup = (userid, companyid, callback) => {
  var checkQuery = "SELECT * FROM permissions pm INNER JOIN projects pj ON pm.permid = pj.permid INNER JOIN " +
                   "( " +
	                   "(SELECT permid FROM user_perm_assign WHERE userid = ?) " +
                     "UNION DISTINCT " +
	                   "(SELECT permid FROM group_perm_assign WHERE groupid IN " +
                     "(SELECT groups.groupid FROM users INNER JOIN user_group_assign uga ON users.userid = uga.userid " +
	                   "INNER JOIN groups ON uga.groupid = groups.groupid	WHERE users.userid = ?)) " +
                   ") ugpm ON pm.permid = ugpm.permid " +
                   "WHERE pm.cid = ?"
  var queryInsert = [userid, userid, companyid];
  checkQuery = mysql.format(checkQuery, queryInsert);

  connectDB.query(checkQuery, (err, rows) => {
    console.log("Getting the list of projects for " + userid);
    if (err) {
      console.log(err);
      callback(false);
    } else if (rows.length) {
      console.log("done");
      callback(rows);
    } else {
      callback([]);
    }
  });
};
