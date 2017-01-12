var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    testName = 'signup-passphrase';

module.exports = {
  'test IguanaGUI execute signup sequence': function(browser) {

    browser
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-verify-passphrase')
      .waitForElementVisible('.verify-passphrase-form')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .clearValue('#passphrase')
      .setValue('#passphrase', 'some random incorrect passphrase')
      .pause(250)
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
      .clearValue('#passphrase')
      .setValue('#passphrase', fs.readFileSync('temp/savedpassphrase.txt', 'utf-8'))
      .pause(250)
      .click('#passphrase')
      .pause(250)
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
  }
};