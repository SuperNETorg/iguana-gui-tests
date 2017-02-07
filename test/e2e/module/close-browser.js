var conf = require('../../../nightwatch.conf.js'),
    exec = require('child_process').exec;

module.exports = {
  closeSession: function(results) {
    exec('pkill chromedriver; pkill java', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
      if (error !== null) {
        console.log('exec error: ' + error)
      }
    })
    if ((typeof(results.failed) === 'undefined' || results.failed === 0) &&
        (typeof(results.error) === 'undefined' || results.error === 0)) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
};