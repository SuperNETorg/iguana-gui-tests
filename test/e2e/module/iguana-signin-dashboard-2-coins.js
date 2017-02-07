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
      .pause(250)
      .waitForElementVisible('.terms-conditionals-form')
      .pause(10, function() {
        conf.responsiveTest('.terms-conditionals-form .directives-text', testName, browser, 0, true)
      })
      .click('.terms-conditionals-form .btn-terms-conditions-accept')
      .waitForElementVisible('.dashboard')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
  }
};