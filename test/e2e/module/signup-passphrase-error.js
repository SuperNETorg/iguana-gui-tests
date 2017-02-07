var conf = require('../../../nightwatch.conf.js'),
    testName = 'signup-passphrase-error';

module.exports = {
  'test IguanaGUI execute signup sequence to trigger an error': function(browser) {

    browser
      .click('.btn-add-account')
      .waitForElementVisible('.terms-conditionals-form')
      //.waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-decline')
      .waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-accept')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 0)
      })
      .click('.terms-conditionals-form .btn-terms-conditions-accept')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-red')
      .verify.containsText('.msg-body span', 'Wallet is already encrypted with another passphrase! Try another wallet or login with your passphrase.')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 1)
      })
      .keys(browser.Keys.ESCAPE)
  }
}