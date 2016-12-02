var conf = require('../../../nightwatch.conf.js'),
    step = -1,
    exec = require('child_process').exec;

function getScreenshotUrl() {
  step++;
  return 'screenshots/signup-passphrase-success' + step +'.png';
}

module.exports = {
  'test IguanaGUI execute signup sequence w/ success outcome': function(browser) {
    browser
      .click('.btn-add-account')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-green')
      .verify.containsText('.msg-body span', 'sys wallet is created. Login to access it.')
      .saveScreenshot(getScreenshotUrl())
      .keys(browser.Keys.ESCAPE)
      .pause(5000, function() {
        console.log('restart syscoind')
        exec('./daemon_scripts/bin/syscoind -regtest -daemon', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
        })
      })
  }
}