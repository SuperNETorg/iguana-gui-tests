var conf = require('../../../nightwatch.conf.js'),
    exec = require('child_process').exec,
    testName = 'signup-passphrase-success';

module.exports = {
  'test IguanaGUI execute signup sequence w/ success outcome': function(browser) {

    browser
      .click('.btn-add-account')
      .waitForElementVisible('.terms-conditionals-form')
      .waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-decline')
      .waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-accept')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 0, true)
      })
      .click('.terms-conditionals-form .btn-terms-conditions-accept')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-green')
      .verify.containsText('.msg-body span', 'sys wallet is created. Login to access it.')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 0)
      })
      .keys(browser.Keys.ESCAPE)
      .pause(5000, function() {
        console.log('restart syscoind')
        exec(conf.daemonBinaryPath + 'syscoind -regtest -daemon', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
        })
      })
  }
}