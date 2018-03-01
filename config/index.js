/**
 * config/index.js
 *
 * contains all routes for outward pages (public facing)
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================

var config = {
  local: {
    mode: 'local',
    port: 8003
  },
  dev: {
    mode: 'development',
    port: 7003
  },
  prod: {
    mode: 'production',
    port: 5003
  }
}

module.exports = (mode) => {
  return config[mode] || process.argv[2] || 'local' || config['local']
}
