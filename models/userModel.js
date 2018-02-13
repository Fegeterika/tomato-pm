/**
 * userModel.js
 *
 * Logics for user-related processes
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
exports.checkUserExistsWithReq = (email) => {
  var checkQuery = "SELECT * FROM users WHERE email = ?";
  var queryInsert = email.toLowerCase();
  checkQuery = mysql.format(checkQuery, queryInsert);

  connectDB.query(checkQuery, (err, rows) => {
    console.log("Query Submitted");
    console.log(rows);
    if (err) return false;
    if (rows.length) {
      return true;
    } else {
      return false;
    }
  });

}

exports.readListOfProjects = (userid, companyid, callback) => {
  var checkQuery = "SELECT * FROM (SELECT cid FROM companies WHERE cid = ?) AS cp INNER JOIN permissions pm ON cp.cid = pm.cid INNER JOIN (SELECT userid, permid FROM user_perm_assign WHERE userid = ?) AS upa ON pm.permid = upa.permid INNER JOIN projects pj on pj.permid = pm.permid";
  var queryInsert = [companyid, userid];
  checkQuery = mysql.format(checkQuery, queryInsert);

  connectDB.query(checkQuery, (err, rows) => {
    console.log("Getting the list of projects for " + userid);
    if (err) callback(0);
    if (rows.length) {
      console.log("done");
      callback(rows);
    } else {
      callback(0);
    }
  });
}

exports.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

exports.checkPassword = (row, password) => {
  return bcrypt.compareSync(password, row.pw);
}
