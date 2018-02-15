-- Launched on cloud server via SSH

CREATE DATABASE tomatopm_dev

CREATE USER 'tomatopm'@'%' IDENTIFIED BY 'Tomatopmdev921';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON tomatopm_dev.* TO 'tomatopm'@'%';

USE tomatopm_dev;

CREATE TABLE companies (
  cid INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(256)
);

CREATE TABLE users (
  userid INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(256),
  pw VARCHAR(256),
  FOREIGN KEY(cid) REFERENCES companies(cid)
);

CREATE TABLE groups (
  groupid INTEGER PRIMARY KEY AUTO_INCREMENT,
  cid INTEGER,
  name VARCHAR(256),
  description TEXT,
  FOREIGN KEY (cid) REFERENCES companies(cid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_group_assign (
  assignid INTEGER PRIMARY KEY AUTO_INCREMENT,
  userid INTEGER,
  groupid INTEGER,
  FOREIGN KEY(userid) REFERENCES users(userid),
  FOREIGN KEY(groupid) REFERENCES groups(groupid)
);

CREATE TABLE permissions (
  permid INTEGER PRIMARY KEY AUTO_INCREMENT,
  cid INTEGER,
  name VARCHAR(256),
  FOREIGN KEY(cid) REFERENCES companies(cid)
);

CREATE TABLE projects (
  projectid INTEGER PRIMARY KEY AUTO_INCREMENT,
  cid INTEGER,
  permid INTEGER,
  FOREIGN KEY(cid) REFERENCES companies(cid),
  FOREIGN KEY(permid) REFERENCES permissions(permid),
  name VARCHAR(256),
  description TEXT
);

CREATE TABLE user_perm_assign (
  assignid INTEGER PRIMARY KEY AUTO_INCREMENT,
  permid INTEGER,
  userid INTEGER,
  FOREIGN KEY(permid) REFERENCES permissions(permid),
  FOREIGN KEY(userid) REFERENCES users(userid),
  read_perm BIT(1),
  write_perm BIT(1),
  grant_perm BIT(1)
);

-- Insert sample records
INSERT INTO
