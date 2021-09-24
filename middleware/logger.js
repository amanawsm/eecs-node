const SimpleNodeLogger = require('simple-node-logger');
function log() {
  let opts = {
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS',
    logDirectory:'logs', // NOTE: folder must exist and be writable...
    fileNamePattern:'roll-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
  };
  return SimpleNodeLogger.createRollingFileLogger( opts );
}

module.exports = {
  log,
};
