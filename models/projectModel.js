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
exports.readListOfProjects = (userid, companyid, callback) => {
  var checkQuery = "SELECT * FROM (SELECT cid FROM companies WHERE cid = ?) AS cp " +
                   "INNER JOIN permissions pm ON cp.cid = pm.cid INNER JOIN " +
                   "(SELECT userid, permid FROM user_perm_assign WHERE userid = ?) AS upa " +
                   "ON pm.permid = upa.permid INNER JOIN projects pj on pj.permid = pm.permid";
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
