var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    testName = 'signup-after-wallet-encrypt';

module.exports = {
  'test IguanaGUI execute signin w/ a passphrase created before': function(browser) {

    browser
      .pause(2000)
      .clearValue('#passphrase')
      .setValue('#passphrase', fs.readFileSync('temp/savedpassphrase.txt', 'utf-8'))
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 0, true)
      })
      .getAttribute('.btn-signin-account', 'disabled', function(result) {
        console.log('singin button should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-signin-account')
      .pause(250)
      .waitForElementVisible('.terms-conditionals-form')
      .pause(10, function() {
        conf.responsiveTest('.terms-conditionals-form .directives-text', testName, browser, 0, true)
      })
      .click('.terms-conditionals-form .btn-terms-conditions-accept')
      .waitForElementVisible('.dashboard', 5000)
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 0, true)
      })
  }
};