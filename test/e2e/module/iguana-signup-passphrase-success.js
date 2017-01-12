var conf = require('../../../nightwatch.conf.js'),
    testName = 'iguana-signup-passphrase-success';

module.exports = {
  'test IguanaGUI click add account on passphrase verification step ()': function(browser) {

    browser
      .click('.btn-add-account')
      .waitForElementVisible('.terms-conditionals-form')
      .waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-decline')
      .waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-accept')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
      .click('.terms-conditionals-form .btn-terms-conditions-accept')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-green')
      .verify.containsText('.msg-body span', 'sys wallet is created. Login to access it.')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser)
      })
      .keys(browser.Keys.ESCAPE)
  }
}