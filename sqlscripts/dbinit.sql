-- Launched on cloud server via SSH

CREATE DATABASE tomatopm_dev

CREATE USER 'tomatopm'@'localhost' IDENTIFIED BY 'Tomatopmdev921';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON tomatopm_dev.* TO 'tomatopm'@'%';
