var conf = require('../../../nightwatch.conf.js'),
    testName = 'iguana-signin-to-dashboard-2-coins';

module.exports = {
  'test IguanaGUI singin to dashboard w/ 2 coins (iguana)': function(browser) {

    browser
      .clearValue('#passphrase')
      .setValue('#passphrase', ['test test'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
      .getAttribute('.btn-signin-account', 'disabled', function(result) {
        console.log('singin button should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-signin-account')
      /*.pause(250)
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-green')
      .verify.containsText('.msg-body span', 'SYS, DOGE added')
      .pause(10, function() {
        responsiveTest('window')
      })*/
      .waitForElementVisible('.dashboard')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
  }
};