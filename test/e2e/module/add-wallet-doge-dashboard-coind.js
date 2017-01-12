var conf = require('../../../nightwatch.conf.js'),
    testName = 'login-add-wallet-doge-dashboard';

module.exports = {
  'test IguanaGUI execute add doge wallet on dashboard page': function(browser) {

    browser
      .pause(500)
      .verify.cssClassNotPresent('.coins .btn-add-coin', 'disabled')
      .moveToElement('.coins .btn-add-coin', 2, 2, function() {
        console.log('this should open add coin modal')
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          .setValue('.quick-search input[type=text]', ['someunknowncoin'])
          .waitForElementNotPresent('.supported-coins-repeater-inner .coin', 500)
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          .clearValue('.quick-search input[type=text]')
          .verify.visible('.supported-coins-repeater-inner .coin.doge')
          .setValue('.quick-search input[type=text]', ['dogecoin'])
          .pause(500)
          .verify.visible('.supported-coins-repeater-inner .coin.doge')
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          .click('.supported-coins-repeater-inner .coin.doge')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .waitForElementPresent('#passphrase')
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
          .waitForElementVisible('.dashboard', 5000)
          .pause(10, function() {
            conf.responsiveTest('window', testName, browser)
          })
      })
  }
};